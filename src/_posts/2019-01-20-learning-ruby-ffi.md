---
layout: post
title: "Encapsulating a C library using Ruby ffi"
date:   2019-01-20 00:00:00 -0500
categories: ruby, ffi, C, wrapping, native
permalink: /essays/learning-ruby-ffi
---

# Motivation

Recently I read an article called **[Ruby Bindings and Extensions](https://medium.com/stuart-engineering/ruby-bindings-and-extensions-91c794eb9acd)**
where the author shows how in his company they were given the task of encapsulating a C library called [H3](https://github.com/uber/h3) using Ruby
and after evaluating the available options they decided to use [ffi](https://github.com/ffi/ffi) to do this work.

After reading the article I decided that I wanted to try this. Probably I won't use this knowledge soon in my current project, but who knows,
I think it's a good tool to keep in mind.

In this essay, I want to share the process that I followed to experiment with ffi.


# Creating a C library for experimenting

I had a while without writing something in C. So I decided to bring back my rusty C programming knowledge, For this task, I decided to create a super
simple library for managing PGM images with only four functions.
- A `loadPgm` function that loads the PGM file.
- A `invertColors` function that takes the loaded image and creates a new image with the inverted colors.
- A `savePgm` function that saves the generated image in a new file.
- A `freePgm` function that release the allocated memory in the previous functions.

# Compiling a shared library
Well, the first part was easy only bring back some memory allocation, and pass by reference concepts. The second part was remembering how to create a shared library
with my code. I looked on internet and I found a very well detailed article that explains what is a shared library and how this works here is the link if you are interested
on learning more about it **[Shared libraries with GCC on Linux](https://www.cprogramming.com/tutorial/shared-libraries-linux-gcc.html)**.

To cover this requirement I added a new task inside my `makefile`, that create the shared library from my object file:

```bash
shared:
	mkdir -p lib
	gcc -c -fpic ./pgmlib/lib/pgm.c
	gcc -shared -o lib/pgm.so pgm.o
```

# Creating the Ruby ffi Layer
After creates my C library I started to build the ruby logic that wraps my native code.

The first part was downloading the [ffi](https://github.com/ffi/ffi) gem. After that, although this is only a proof of concept and my library has only 4 functions I decided to
take as reference the project created from the Stuart engineering team and use a similar structure in my project.

I created a Structs module that maps the C `Struct` with a `FFI::Struct`.

C `Struct`
```C
typedef struct Pgm {
  char* magicNumber;
  int width;
  int height;
  int maxVal;
  int** image;
} Pgm;
```

Ruby `FFI::Struct`
```ruby
class Pgm < FFI::Struct
  layout :magic_number, :string,
         :width, :int,
         :height, :int,
         :max_val, :int,
         :image, :pointer
end
```

After That, I created a Base module where I add all the FFI base configuration. Here I specify the route for the shared library and incude the FFI dependency.

```ruby
module Base
  def self.extended(base)
    lib_path = File.expand_path(__dir__ + '/../../../ext/src/lib')
    base.extend FFI::Library
    base.include Structs
    base.ffi_lib "#{lib_path}/pgm.so"
    base.typedef :pointer, :pgm
  end
end
```

After that, I added a `Functions` module that handles the wrapping of the C library functions.
```ruby
module Functions
  extend PGM::Bindings::Base

  attach_function :load_pgm, :loadPgm, %i[pgm string], :pgm
  attach_function :save_pgm, :savePgm, %i[pgm string], :pgm
  attach_function :invert_colors, :invertColors, %i[pgm pgm], :void
end
```

And finally I added the entry module entry point `pgm.rb`
```ruby
require 'ffi'

require_relative './pgm/bindings'
require_relative './pgm/functions'

module PGM
  extend Functions
end
```

## Testing my brand new ruby module
For this I did the following steps:

- Open a `irb` console.
- Import the pgm ruby module.
- Create a new instance of the Pgm ffi class.
- Call the `load_pgm` function.
- Create a new instance of the Pgm class that will get the conversion color output.
- Call the `invert_colors` function.
- Call the `save_pgm` function.
- Verify that the new image has been created.


```ruby
>> require './lib/pgm'
=> true
>> pgm = PGM::Bindings::Structs::Pgm.new
=> #<PGM::Bindings::Structs::Pgm:0x00007f9b42806cb0>
>> PGM::Functions.load_pgm(pgm, './lib/feep.pgm')
=> #<FFI::Pointer address=0x0000000000000000>
>> pgm_out = PGM::Bindings::Structs::Pgm.new
=> #<PGM::Bindings::Structs::Pgm:0x00007f9b40145e78>
>> PGM::Functions.invert_colors(pgm, pgm_out)
=> nil
>> PGM::Functions.save_pgm(pgm_out, './lib/feep_out.pgm')
=> #<FFI::Pointer address=0x0000000000000000>
```

feep.pgm
![feep.pgm](https://cl.ly/1e2bfc528be8/Image%202019-01-20%20at%2012.59.38%20AM.png)

feep_out.pgm
![feep_out.pgm](https://cl.ly/c5f02807b677/Image%202019-01-20%20at%201.04.51%20AM.png)

## Conclusion
This was only a proof of concept but I have learned a lot of new things, I think ffi is an amazing alternative when you have native code
and you want to call it inside your application. If you want to see all the code and play with it here is the repository **[pgm_ffi](https://github.com/JuanCrg90/pgm_ffi)**.
