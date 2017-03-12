## Summary
Tourists often look for the best places to go. For that, use OpenTable. But what if you want to know the worst places to go? Or places that you should avoid?

**Welcome to BrokenTable**. Your source for the most broken restaurants in San Francisco.

Also, pay-per-view fights are too expensive. What if you want to actually *see a broken table?*

Well, your best chance is a **bar fight**. So BrokenTable also combines crime data with restaurant data to give you the most dangerous and bar-fight ready restaurants around.



## Frontend

A React Native Application that uses Maps, a dynamic ListView, and a bunch of other components. It also uses the awesome redux library to manage state.


## Backend

### San Francisco Restaurant Data grabbed from [OpenTable](http://www.opentable.com/) :)

### San Francisco Crime Data grabbed from [SFOpenData]

[I'm an inline-style link](https://www.google.com)

We built our own custom api for crimes and restaurants. The endpoints are hosted on **ServerLess.**

[Serverless.yml](https://github.com/MiLeung/BrokenTable/blob/master/api/my-service/serverless.yml)

#### list of restaurants
GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/restaurants

### list of crimes
GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/crimes

### list of restaurants and number of crimes nearby (unsorted)
GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/unsorted_crime_restaurants

### list of restaurants and number of crimes nearby (sorted)
GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/sorted_crime_restaurants
