(function () {

    // Simulate a remote web service. For simplicity, just hard-coding the data here rather than building a real server-side endpoint.
    // Note that it *is* returning asynchronously, so Ajax requests would work the same.

    var locations = [
        { id: null, name: "Places", childLocations: ["america", "europe"] },
        { id: "america", name: "Americas", childLocations: ["canada", "usa"] },
        { id: "europe", name: "Europe", childLocations: ["italy", "uk"] },
        { id: "canada", name: "Canada", childLocations: ["vancouver", "toronto", "edmonton"] },
        { id: "usa", name: "USA", childLocations: ["austin", "seattle", "sanfran"] },
        { id: "italy", name: "Italy", childLocations: ["verona", "gerona", "milan"] },
        { id: "uk", name: "United Kingdom", childLocations: ["edinburgh", "cambridge", "grimesthorpe"] },
        { id: "vancouver", name: "Vancouver", childLocations: [] },
        { id: "toronto", name: "Toronto", childLocations: [] },
        { id: "edmonton", name: "Edmonton", childLocations: [] },
        { id: "austin", name: "Austin", childLocations: [] },
        { id: "seattle", name: "Seattle", childLocations: [] },
        { id: "sanfran", name: "San Francisco", childLocations: [] },
        { id: "verona", name: "Verona", childLocations: [] },
        { id: "gerona", name: "Gerona", childLocations: [] },
        { id: "milan", name: "Milan", childLocations: [] },
        { id: "edinburgh", name: "Edinburgh", childLocations: [] },
        { id: "cambridge", name: "Cambridge", childLocations: [] },
        { id: "grimesthorpe", name: "Grimesthorpe", childLocations: [] }
    ];

    function findLocation(locationId) {
        for (var i = 0; i < locations.length; i++)
            if (locations[i].id == locationId)
                return locations[i];
    }

    function findLocations(locationIds) {
        var result = [];
        for (var i = 0; i < locationIds.length; i++)
            result.push(findLocation(locationIds[i]));
        return result;
    }

    function findParent(locationId) {
        // Hardly efficient, but if you had a real database, each element would reference its parent, so you'd navigate that way
        for (var i = 0; i < locations.length; i++)
            for (var j = 0; j < locations[i].childLocations.length; j++)
                if (locations[i].childLocations[j] == locationId)
                    return locations[i];
        return null;
    }

    window.locationInfoService = {
        getLocationInfoAsync: function (locationId, callback) {
            // Async to be consistent with real Ajax requests
            setTimeout(function () {
                var location = findLocation(locationId);
                callback({
                    id: location.id,
                    name: location.name,
                    parent: findParent(locationId),
                    children: findLocations(location.childLocations)
                });
            }, 50);
        }
    }
})();