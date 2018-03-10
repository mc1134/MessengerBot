#Price Center drawPath

## PlaceName.java
Contains enums of places in Price center

##Constants.java
Contains GPS locations of places in Price center, maps needed to implement 
drawPath

LANDMARKS - array of autocomplete strings

LOCATIONS - map of PlaceName enums to GPS locations

FLOORS - map of PlaceName enums to respected floors in Price center

PREVIOUS - map of PlaceName enums to other PlaceName enums
This is where you create the paths.
The keys represent the destination and the value represent a point before the 
destination. This help with finding the path from the destination back to SRC. 

getPath - function to retrieve PlaceName enums using PREVIOUS based on the 
destination

##MapsActivity.java

###drawPath
After getting the Arraylist of PlaceName enums and convert it to an array, you 
can call drawPath. In drawPath, it first initialize theLine. Then, it goes 
through the PlaceName enum array and check the PlaceName enums' floors using 
FLOORS if they match the specified floor. If so, we add its GPS location to an 
Arraylist. If not, we ignore it. After getting all the points for the specified 
floor, we set theLine with the points we got, drawing the line on the map.
