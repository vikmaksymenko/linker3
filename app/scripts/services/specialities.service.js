angular.module("diplomaApp")
    .factory('Specialities', function($firebaseArray, FirebaseUrl){
        var o = {};

        o.specialitiesRef = new Firebase(FirebaseUrl+'specialities');
        o.specialities = $firebaseArray(o.specialitiesRef);

        o.getSpecialitiesByFaculty = function(faculties) {
            var specialities = [];
            for(var i = 0; i < faculties.length; i++) {
                o.specialitiesRef.orderByChild("faculty").equalTo(faculties[i].$id).on("value", function (snapshot) {
                    tmp = snapshot.val();

                    console.log(tmp);

                    for (var property in tmp) {
                        if (tmp.hasOwnProperty(property)) {
                            tmp[property]["$id"] = property;
                            tmp[property]["faculty_name"] = faculties[i].name;
                            specialities.push(tmp[property]);
                        }
                    }
                });
            }
            return specialities;
        };

        return o;
    }); 