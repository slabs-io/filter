"use strict";

var Q = require('q'),
    _ = require('lodash');

/**
 * process takes an array of data sources and sorts based on input field
 * @param input {object} input settings and input data
 * @returns {object}
 */
exports.process = function (input) {

    var deferred = Q.defer();

    var data = input.data[0];
    var filterText = input.settings.filterText.toLowerCase();
    var properties = input.settings.properties;

    if(!filterText || filterText.trim() === ''){
        deferred.resolve(data);
    }else{

        data = _.filter(data, function(item){
            
            var found = false;
            
            _.each(properties, function(property){
                
                var propertyText = item[property];
                
                if(propertyText && propertyText.toLowerCase().indexOf(filterText) > -1){
                    found = true;
                }
            });
            
            return found;
            
        });

        deferred.resolve(data);

    }

    return deferred.promise;
};
