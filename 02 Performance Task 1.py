# Print Two Lines Using Separate print() Functions
print("I spy with my little tired eye, tiny as a firefly")
print("A pebble that we picked up last July")

# Insert an Empty print() Function
print("I spy with my little tired eye, tiny as a firefly")
print()
print("A pebble that we picked up last July")

# Insert \n Between Arguments
print("I spy with my little tired eye, tiny as a firefly,\nA pebble that we picked up last July")

# Use Three Separate Arguments in print()
print("I spy with my", "little tired eye,", "tiny as a firefly")
print("A pebble that we picked up last July")

# Add end=" " to the First print()
print("I spy with my", "little tired eye,", "tiny as a firefly", end=" ") 
print("A pebble that we picked up last July") 

# Use sep="-" in the Second print()
print("A pebble that", "we picked up", "last July", sep="-")

# Use Both end and sep Together
print("I spy with my", "little tired eye,", "tiny as a firefly", sep="-", end=" ")  
print("A pebble that", "we picked up", "last July", sep="-") 
