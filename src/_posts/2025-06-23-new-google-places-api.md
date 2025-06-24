---
layout: post
title: "Mastering Google's New Places API: Shadow DOM Styling, Form Prepopulation, and Real-World Integration"
date: 2025-06-23 00:00:00 -0500
categories: Google Maps, Stimulus, Rails
permalink: /posts/mastering-google-places-new-api
---

Google's new Places API introduces powerful web components that make location autocomplete easier than ever. However, integrating these components into existing applications comes with unique challenges, particularly around styling and form integration. This post documents our journey implementing Google Places autocomplete in a Rails application, including solutions to the trickiest problems we encountered.

## The New Google Places API: A Game Changer

Google's latest Places API introduces the `<gmp-place-autocomplete>` web component, which replaces the traditional JavaScript-based autocomplete. This new approach offers several advantages:

- **Simplified Integration**: No need to manually create input elements and manage dropdown positioning
- **Better Performance**: Optimized by Google with built-in caching and request optimization
- **Enhanced UX**: Consistent styling and behavior across all implementations
- **Future-Proof**: Built on web standards with ongoing Google support

## Basic Implementation

### 1. Setting Up the API

First, you'll need to configure your Google Maps API key. The new Places API requires both the "Places API (New)" and "Maps JavaScript API" to be enabled in your Google Cloud Console.

```erb
<!-- app/views/layouts/application.html.erb -->
<% if google_maps_api_key.present? %>
  <script>
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
      ({key: "<%= google_maps_api_key %>", v: "weekly"});
  </script>
<% end %>
```

### 2. Basic HTML Structure

The simplest implementation uses the web component directly:

```erb
<gmp-place-autocomplete
  requested-language="<%= I18n.locale %>"
  requested-region="MX"
  data-place-autocomplete-target="autocomplete"
  placeholder="Enter a location"
></gmp-place-autocomplete>
```

#### Localization Attributes

The `<gmp-place-autocomplete>` component supports localization through two key attributes:

- **`requested-language`**: Sets the language for place suggestions and UI text. Use standard language codes like `"en"`, `"es"`, `"fr"`, etc. In Rails applications, you can dynamically set this using `<%= I18n.locale %>` to match your application's current locale.

- **`requested-region`**: Biases search results toward a specific country or region using ISO 3166-1 Alpha-2 country codes. For example, `"MX"` for Mexico, `"US"` for United States, `"CA"` for Canada. This helps prioritize local results for better user experience.

These attributes work together to provide localized, region-appropriate place suggestions that match your application's target audience.

### 3. JavaScript Integration

```javascript
// app/javascript/controllers/place_autocomplete_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["autocomplete"]

  async connect() {
    await this.initializeAutocomplete()
  }

  async initializeAutocomplete() {
    if (!window.google || !window.google.maps) {
      setTimeout(() => this.initializeAutocomplete(), 100)
      return
    }

    await google.maps.importLibrary("places")
    this.autocompleteTarget.addEventListener('gmp-select', this.onPlaceSelect.bind(this))
  }

  async onPlaceSelect({ placePrediction }) {
    const place = placePrediction.toPlace()
    await place.fetchFields({
      fields: ['displayName', 'formattedAddress', 'googleMapsURI']
    })

    console.log('Selected place:', place.displayName)
    console.log('Google Maps URL:', place.googleMapsURI)
  }
}
```

## The Shadow DOM Challenge

Here's where things get interesting. Google's `<gmp-place-autocomplete>` component uses a **closed Shadow DOM**, which means you cannot style it with external CSS. This is a significant departure from traditional web development practices.

### Understanding the Shadow DOM Structure

When you inspect the component, you'll see something like this:

```html
<gmp-place-autocomplete>
  #shadow-root (closed)
    <div class="widget-container">
      <div class="input-container">
        <div class="autocomplete-icon">
          <svg>...</svg>
        </div>
        <input aria-autocomplete="list" ...>
        <div class="focus-ring"></div>
        <button class="clear-button">...</button>
      </div>
      <div class="predictions-anchor">
        <div class="dropdown">...</div>
      </div>
    </div>
</gmp-place-autocomplete>
```

The `#shadow-root (closed)` means external CSS cannot penetrate this boundary. Traditional approaches like this **will not work**:

```css
/* This won't work! */
gmp-place-autocomplete input {
  border: 1px solid #ccc;
  padding: 8px;
}
```

## The Shadow DOM Styling Solution

After extensive research and experimentation, we developed a solution that monkey-patches the `attachShadow` method to force the Shadow DOM to be open, allowing us to inject custom styles.

### The Monkey Patch Approach

```javascript
setupShadowDOMStyling() {
  if (!window.gmpShadowPatched) {
    const originalAttachShadow = Element.prototype.attachShadow

    Element.prototype.attachShadow = function (init) {
      if (this.localName === "gmp-place-autocomplete") {
        // Force shadow DOM to be open so we can style it
        const shadow = originalAttachShadow.call(this, {
          ...init,
          mode: "open"
        })

        const style = document.createElement("style")
        style.textContent = `
          /* Style the input container to match Tailwind border and shadow */
          .input-container {
            border: 1px solid #9CA3AF !important;
            border-radius: 6px !important;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
            background-color: white !important;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
          }

          /* Focus state for the container */
          .input-container:focus-within {
            border-color: #3B82F6 !important;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 1px #3B82F6 !important;
          }

          /* Style the input itself minimally */
          input {
            border: none !important;
            outline: none !important;
            font-size: 14px !important;
            font-family: inherit !important;
            line-height: 1.5 !important;
            background: transparent !important;
            padding: 8px 12px !important;
            padding-left: 40px !important; /* Space for search icon */
            padding-right: 40px !important; /* Space for clear button */
          }

          /* Hide Google's default focus ring since we're styling the container */
          .focus-ring {
            display: none !important;
          }

          /* Ensure icons stay in correct position */
          .autocomplete-icon {
            position: absolute !important;
            left: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 1 !important;
          }

          .clear-button {
            position: absolute !important;
            right: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 1 !important;
            background: none !important;
            border: none !important;
            cursor: pointer !important;
          }
        `

        shadow.appendChild(style)
        return shadow
      }
      return originalAttachShadow.call(this, init)
    }

    window.gmpShadowPatched = true
  }
}
```

### Critical Styling Considerations

When styling the Shadow DOM, you must be careful not to break Google's internal layout system. Our initial aggressive approach caused icons to appear outside the input field. The key lessons learned:

1. **Style the container, not the input**: Apply borders and shadows to `.input-container` rather than the `input` element
2. **Preserve icon positioning**: Don't override positioning properties that Google uses for internal layout
3. **Use minimal overrides**: Only change what's necessary for visual consistency
4. **Maintain proper padding**: Ensure adequate space for search and clear icons

## Form Integration and Data Flow

### Hidden Fields Pattern

For proper form integration, we use hidden fields that get populated when a place is selected:

```erb
<!-- Hidden fields for form submission -->
<%= form.hidden_field :location  %>
<%= form.hidden_field :maps_link %>

<!-- Visible autocomplete component -->
<gmp-place-autocomplete
  inputValue="<%= form.object.location %>"
  data-place-autocomplete-target="autocomplete"
  placeholder="Enter location"
></gmp-place-autocomplete>
```

### Updating Hidden Fields

```javascript
async onPlaceSelect({ placePrediction }) {
  try {
    const place = placePrediction.toPlace()
    await place.fetchFields({
      fields: ['displayName', 'formattedAddress', 'googleMapsURI']
    })

    this.updateFallbackFields(place.displayName, place.googleMapsURI)
  } catch (error) {
    console.error('Error processing place selection:', error)
  }
}

updateFallbackFields(location, mapsUrl) {
  if (this.hasFallbackTarget) {
    const locationInput = this.fallbackTarget.querySelector('input[type="text"]')
    const mapsInput = this.fallbackTarget.querySelector('input[type="url"]')

    if (locationInput) {
      locationInput.value = location
      locationInput.dispatchEvent(new Event('change', { bubbles: true }))
    }

    if (mapsInput) {
      mapsInput.value = mapsUrl
      mapsInput.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }
}
```

## Form Prepopulation: The Tricky Part

One of the most challenging aspects is prepopulating the autocomplete component with existing data when editing a form. The `inputValue` attribute should work, but in practice, it requires careful timing and implementation.

### Setting Initial Values

```erb
<gmp-place-autocomplete
  inputValue="<%= form.object.location if form.object.respond_to?(:location) %>"
  data-place-autocomplete-target="autocomplete"
  placeholder="Enter location"
></gmp-place-autocomplete>
```

### JavaScript Prepopulation

Sometimes the `inputValue` attribute isn't sufficient, especially for dynamically loaded content. Here's a JavaScript approach:

```javascript
populateExistingValues() {
  setTimeout(() => {
    if (this.autocompleteTarget) {
      const internalInput = this.autocompleteTarget.shadowRoot?.querySelector("input")
      if (internalInput) {
        internalInput.value = this.autocompleteTarget.getAttribute("inputValue")
        internalInput.dispatchEvent(new Event("input", { bubbles: true }))
      }
    }
  }, 300)
}
```

The timeout is crucial because the web component needs time to fully initialize before we can access its internal structure.

## Fallback Strategy

Always provide a fallback for users who experience issues with the Google Places API:

```erb
<div class="hidden" data-place-autocomplete-target="fallback">
  <%= form.text_field :location,
      placeholder: "Enter location manually",
      class: "form-input" %>
  <%= form.url_field :maps_link,
      placeholder: "Enter Google Maps URL",
      class: "form-input" %>
</div>

<button type="button"
        data-action="click->place-autocomplete#toggleInputMode">
  Enter location manually
</button>
```

## Error Handling and Graceful Degradation

```javascript
async initializeAutocomplete() {
  try {
    if (!window.google || !window.google.maps) {
      setTimeout(() => this.initializeAutocomplete(), 100)
      return
    }

    await google.maps.importLibrary("places")
    this.autocompleteTarget.addEventListener('gmp-select', this.onPlaceSelect.bind(this))
    this.populateExistingValues()

  } catch (error) {
    console.error('Error initializing Google Places Autocomplete:', error)
    this.showError()
  }
}

showError() {
  const errorDiv = document.createElement('div')
  errorDiv.className = 'text-red-600 text-sm mt-1'
  errorDiv.textContent = 'Unable to load location suggestions. Please enter manually.'

  if (!this.element.querySelector('.error-message')) {
    errorDiv.classList.add('error-message')
    this.element.appendChild(errorDiv)
  }
}
```

## Testing Considerations

Testing Google Places integration requires special considerations due to the custom web components:

```ruby
# test/system/google_places_autocomplete_test.rb
class GooglePlacesAutocompleteTest < ApplicationSystemTestCase
  test "place autocomplete component loads" do
    visit edit_event_path(@event)


    # Check that the Google Places autocomplete elements are present
    # Using page.body.include? since Capybara doesn't recognize custom web components
    assert page.body.include?("gmp-place-autocomplete"), "Page should contain gmp-place-autocomplete elements"

    # Count the number of autocomplete elements
    autocomplete_count = page.body.scan(/<gmp-place-autocomplete/).length
    assert_equal 1, autocomplete_count, "Should have 1 place autocomplete elements"

    # Check that form fields are present
    assert page.body.include?("location"), "Page should contain location field"
    assert page.body.include?("maps_link"), "Page should contain maps_link field"
  end
end
```

### Key Testing Challenges

1. **Custom Web Components**: Capybara doesn't recognize `gmp-place-autocomplete` elements with standard selectors, requiring `page.body.include?` checks
2. **Shadow DOM**: Internal component structure is hidden, making direct element testing difficult
3. **Authentication**: System tests require proper user authentication flow via `system_sign_in` helper
4. **API Dependencies**: Full functionality requires Google Maps API keys and network access

## Performance and Cost Considerations

The new Places API has different pricing than the legacy version:

- **Places Autocomplete**: $0.00282 per request (first 100,000 requests/month free)
- **Places Details**: $0.017 per request
- **Monitor usage** in Google Cloud Console to avoid surprises

## Key Takeaways

1. **Shadow DOM styling requires creative solutions**: The monkey patch approach is currently the only way to style closed Shadow DOM components
2. **Form integration needs careful planning**: Use hidden fields and proper event handling for seamless form submission
3. **Prepopulation is tricky**: Timing is crucial when setting initial values
4. **Always provide fallbacks**: Not all users will have JavaScript enabled or API access
5. **Test thoroughly**: The integration has many moving parts that need comprehensive testing

## Future Considerations

Google may eventually provide official styling APIs for their web components. Until then, the Shadow DOM monkey patch remains the most reliable solution for custom styling. Monitor Google's documentation for updates to the Places API and web component specifications.

## References

### Official Documentation
- [Google Places API (New) Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
- [Place Autocomplete Widget Reference](https://developers.google.com/maps/documentation/javascript/reference/places-widget)
- [Place Autocomplete Widget](https://developers.google.com/maps/documentation/javascript/place-autocomplete-new#add-an-autocomplete-widget-to-a-web-page)
- [Web Components and Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
- [Google Maps Platform Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)

### Community Resources & Solutions
- [How to style Google Maps PlaceAutocompleteElement to match existing form inputs?](https://stackoverflow.com/questions/79556333/how-to-style-google-maps-placeautocompleteelement-to-match-existing-form-inputs)

### Technical Deep Dives
- [MDN: attachShadow() method](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) - Understanding Shadow DOM manipulation
- [CSS-Tricks: Shadow DOM](https://css-tricks.com/an-introduction-to-web-components/) - Web Components and styling strategies

---

*This implementation was developed through extensive experimentation and testing. While the Shadow DOM styling approach works reliably, it's technically a "hack" that could potentially break with future Google updates. Always test thoroughly and have fallback plans in place.*
