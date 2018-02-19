/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {

    loadSupers();

    // Profile(Update/edit Button onclick handler
    $('#edit-button').click(function (event) {

// check for errors and display any that we have
// pass the input associated with the edit form to the validation function
        //var haveValidationErrors = checkAndDisplayValidationErrors($('#edit-form').find('input'));
        // if we have errors, bail out by returning false
        //if (haveValidationErrors) {
        //return false;
        //}

// if we get to here, there were no errors, so make the Ajax call
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/HEROdb/superHuman/' + $('#profile-super-id').val(),
            data: JSON.stringify({
                superHumanId: $('#profile-super-id').val(),
                superHumanName: $('#profile-super-name').val(),
                description: $('#profile-description').val(),
                sightings: $('#profileSightings').val(),
                organizations: $('#profileOrganizations').val(),
                superPowers: $('#listOfSuperPowers').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                // clear errorMessages
                $('#errorMessages').empty();
                //hideEditForm();
                loadSupers();
            },
            error: function () {
                $('#errorMessages')
                        .append($('<li>')
                                .attr({class: 'list-group-item list-group-item-danger'})
                                .text('Error calling web service.  Please try again later.'));
            }
        });
    });
});

function loadSupers() {
    // we need to clear the previous content so we don't append to it
    clearSuperTable();
    $('#errorMessages').empty();
    // grab the the tbody element that will hold the rows of contact information
    var contentRows = $('#contentRows');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/HEROdb/superHumans',
        success: function (data, status) {
            $.each(data, function (index, superHuman) {
                var name = superHuman.superHumanName;
                var description = superHuman.description;
                var id = superHuman.superHumanId;
                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + description + '</td>';
                //row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                row += '<td><a role="button" id="profileButton" class="btn btn-primary" data-toggle="modal" data-target="#myModal"onclick="viewProfile(' + id + ')"><span class="glyphicon glyphicon-expand"></span> View Profile!</a></td>';
                //row += '<td><a onclick="deleteContact(' + id + ')">Delete</a></td>';
                row += '<td><a role="button" id="editPageButton" class="btn btn-warning" href="displayProfile?superId=' + id + '"><span class="glyphicon glyphicon-expand"></span> Edit</a></td>';
                row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSuper(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                row += '</tr>';
                contentRows.append(row);
            });
        },
        error: function () {
            $('#errorMessages')
                    .append($('<li>')
                            .attr({class: 'list-group-item list-group-item-danger'})
                            .text('Error calling web service.  Please try again later.'));
        }
    });
}

function clearSuperTable() {
    $('#contentRows').empty();
}

function deleteSuper(id) {

    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:8080/HEROdb/superHuman/' + id,
        success: function () {
            loadSupers();
        },
        error: function () {
            $('#errorMessages')
                    .append($('<li>')
                            .attr({class: 'list-group-item list-group-item-danger'})
                            .text('Error calling web service.  Please try again later.'));
        }
    });

}

function viewProfile(id) {
// clear errorMessages
// same as "showEditForm in ContactList exercise
    $('#errorMessages').empty();

    $('#listOfSuperPowers').empty();

    $('#profileOrganizations').empty();

    $('#profileSightings').empty();
    //declare the listOfSuperPowers variable
    var listOfSuperPowers = $('#listOfSuperPowers');
    var profileOrganizations = $('#profileOrganizations');
    var profileSightings = $('#profileSightings');

    // get the SuperHuman details from the server and then fill and show the
    // form on success
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/HEROdb/superHuman/' + id,
        success: function (data, status) {
            $('#profile-super-id').val(data.superHumanId);
            $('#profile-super-name').val(data.superHumanName);
            $('#profile-description').val(data.description);
            //$('#profile-sightings').html(data.sightings);
            //$('#profile-organizations').html(data.organizations);
            //$('#profile-superPowers').html(data.superPowers);
            // Retrieve list of Super Powers & display w. Checkboxes
            var superPowers = data.superPowers;
            $.each(superPowers, function (index, superPower) {
                //alert(key + ": " + superPowers);
                var powerId = superPower.powerTypeId;
                var name = superPower.name;
                var description = superPower.description;
                var superList = '<label class="checkbox-inline">';
                superList += '<input type="checkbox" id="powerType' + powerId + '" value="' + powerId + '" checked>' + name + '</input>';
                superList += '</label>';
                listOfSuperPowers.append(superList);
            });
            var organizations = data.organizations;
            $.each(organizations, function (index, organization) {
                var orgId = organization.organizationId;
                var orgName = organization.organizationName;
                var orgDescription = organization.description;
                var orgList = '<label class="checkbox-inline">';
                orgList += '<input type="checkbox" id="orgList' + orgId + '" value="' + orgId + '" checked>' + orgName + '</input>';
                orgList += '</label>';
                profileOrganizations.append(orgList);
            });
            var sightings = data.sightings;
            $.each(sightings, function (index, site) {
                var siteId = site.sightingId;
                var siteName = site.name;
                var siteDescription = site.description;
                var siteDate = site.sightingDate;
                var siteLat = site.latitude;
                var siteLong = site.longitude;
                var siteList = '<label class="checkbox-inline">';
                siteList += '<input type="checkbox" id="siteList' + siteId + '" value="' + siteId + '" checked>' + siteName + ': ' + siteLat + ', ' + siteLong + '</input>';
                siteList += '</label>';
                profileSightings.append(siteList);
            });

            var chosenSuper = data.superHumanId;
            //function getSuperPowers(chosenSuper)

            //var requestedId = $('#profileId')
            //$('#profile-super-id').append('<input name="superId" value="' + requestedId + '")/>')
        },
        error: function () {
            $('#errorMessages')
                    .append($('<li>')
                            .attr({class: 'list-group-item list-group-item-danger'})
                            .text('Error calling web service.  Please try again later.'));
        }
    });

    //row += '<td><a role="button" id="profileButton" class="btn btn-warning" data-toggle="modal" data-target="#myModal"onclick="viewProfile(' + id + ')"><span class="glyphicon glyphicon-expand"></span> View Profile!</a></td>';


    $('#contactTableDiv').hide();
    $('#editFormDiv').show();
}

function clearSearchCriteria() {
    $('#searchCriteria').val('');
}

function getSearchRequest() {
// we need to clear the previous content so we don't append to it
    clearSuperTable();
    $('#errorMessages').empty();
    //clearContentHeader();

    // Grab the selected search option
    var search = $('#requestedSearch').val();
    // Get the additional information needed to complete the search
    var criteria = $('#searchCriteria').val();
    //grab the Table Title to append based on search criteria
    //var newTitle = $('#titleAddition');
    // grab the table header to adjust based on search parameters
    // var contentHeader = $('#contentTableHeader');


    // grab the the tbody element that will hold the rows of contact information
    var contentRows = $('#contentRows');

    if (search == 'findById') {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/superHuman/' + criteria,
            success: function (data, status) {
                var name = data.superHumanName;
                var description = data.description;
                var id = data.superHumanId;
                // add the contents of the header
                // contentHeader.append('<th width="25%">Super Human Name</th><th width="60%">Description</th><th width="15%"></th>');
                // create the contents of each row within the table and append
                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + description + '</td>';
                //row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                row += '<td><a role="button" id="profileButton" class="btn btn-primary" data-toggle="modal" data-target="#myModal"onclick="viewProfile(' + id + ')"><span class="glyphicon glyphicon-expand"></span> View Profile!</a></td>';
                //row += '<td><a onclick="deleteContact(' + id + ')">Delete</a></td>';
                row += '<td><a role="button" id="editPageButton" class="btn btn-warning" href="displayProfile?superId=' + id + '"><span class="glyphicon glyphicon-expand"></span> Edit</a></td>';
                row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSuper(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                row += '</tr>';
                contentRows.append(row);
            },
            error: function () {
                $('#errorMessages')
                        .append($('<li>')
                                .attr({class: 'list-group-item list-group-item-danger'})
                                .text('Please Enter the Registration Id of the Super Human.'));
            }
        });

        // clear the previous input for search
        clearSearchCriteria();


    } else if (search == 'findByOrg') {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/superHumansByOrg/' + criteria,
            success: function (data, status) {
                $.each(data, function (index, superHuman) {
                    var name = superHuman.superHumanName;
                    var description = superHuman.description;
                    var id = superHuman.superHumanId;
                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + description + '</td>';
                    //row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                    row += '<td><a role="button" id="profileButton" class="btn btn-primary" data-toggle="modal" data-target="#myModal"onclick="viewProfile(' + id + ')"><span class="glyphicon glyphicon-expand"></span> View Profile!</a></td>';
                    //row += '<td><a onclick="deleteContact(' + id + ')">Delete</a></td>';
                    row += '<td><a role="button" id="editPageButton" class="btn btn-warning" href="displayProfile?superId=' + id + '"><span class="glyphicon glyphicon-expand"></span> Edit</a></td>';
                    row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSuper(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                    row += '</tr>';
                    contentRows.append(row);
                });
            },
            error: function () {
                $('#errorMessages')
                        .append($('<li>')
                                .attr({class: 'list-group-item list-group-item-danger'})
                                .text('Please Enter the Registration Id of the Organization.'));
            }
        });

        // clear the previous input for search
        clearSearchCriteria();

    } else if (search == 'showAllSupers') {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/superHumans',
            success: function (data, status) {
                $.each(data, function (index, superHuman) {
                    var name = superHuman.superHumanName;
                    var description = superHuman.description;
                    var id = superHuman.superHumanId;
                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + description + '</td>';
                    row += '<td><a role="button" id="profileButton" class="btn btn-primary" data-toggle="modal" data-target="#myModal"onclick="viewProfile(' + id + ')"><span class="glyphicon glyphicon-expand"></span> View Profile!</a></td>';
                    //row += '<td><a onclick="deleteContact(' + id + ')">Delete</a></td>';
                    row += '<td><a role="button" id="editPageButton" class="btn btn-warning" href="displayProfile?superId=' + id + '"><span class="glyphicon glyphicon-expand"></span> Edit</a></td>';
                    row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSuper(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                    row += '</tr>';
                    contentRows.append(row);
                });
            },
            error: function () {
                $('#errorMessages')
                        .append($('<li>')
                                .attr({class: 'list-group-item list-group-item-danger'})
                                .text('Error calling web service.  Please try again later.'));
            }
        });

        // clear the previous input for search
        clearSearchCriteria();

    } else if (search == 'findBySighting') {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/superHumansBySite/' + criteria,
            success: function (data, status) {
                $.each(data, function (index, superHuman) {
                    var name = superHuman.superHumanName;
                    var description = superHuman.description;
                    var id = superHuman.superHumanId;
                    //var siteName = superHuman.name;
                    //var latitude = sighting.latitude;
                    //var longitude = sighting.longitude;
                    // Change the Table Title
                    //newTitle.append('" at "' + siteName + ': ' + latitude + ', ' + longitude);
                    // add the contents of the header
                    //contentHeader.append('<th width="25%">Super Human Name</th><th width="25%">Site Name / Event</th><th width="60%">Description</th><th width="15%"></th>');
                    // create the contents of each row within the table and append
                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + description + '</td>';
                    row += '<td><a role="button" id="profileButton" class="btn btn-primary" data-toggle="modal" data-target="#myModal"onclick="viewProfile(' + id + ')"><span class="glyphicon glyphicon-expand"></span> View Profile!</a></td>';
                    //row += '<td><a onclick="deleteContact(' + id + ')">Delete</a></td>';
                    row += '<td><a role="button" id="editPageButton" class="btn btn-warning" href="displayProfile?superId=' + id + '"><span class="glyphicon glyphicon-expand"></span> Edit</a></td>';
                    row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSuper(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                    row += '</tr>';
                    contentRows.append(row);
                });
            },
            error: function () {
                $('#errorMessages')
                        .append($('<li>')
                                .attr({class: 'list-group-item list-group-item-danger'})
                                .text('Please Enter the Registration Id of the Sighting.'));
            }
        });

        // clear the previous input for search
        clearSearchCriteria();
    } else if (search == 'nameSearch') {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/superHumans',
            success: function (data, status) {
                $.each(data, function (index, superHuman) {
                    var input = new RegExp(superHuman.superHumanName, 'gi');
                    if (input.test(criteria)) {
                        var name = superHuman.superHumanName;
                        var description = superHuman.description;
                        var id = superHuman.superHumanId;
                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + description + '</td>';
                        row += '<td><a role="button" id="profileButton" class="btn btn-primary" data-toggle="modal" data-target="#myModal"onclick="viewProfile(' + id + ')"><span class="glyphicon glyphicon-expand"></span> View Profile!</a></td>';
                        //row += '<td><a onclick="deleteContact(' + id + ')">Delete</a></td>';
                        row += '<td><a role="button" id="editPageButton" class="btn btn-warning" href="displayProfile?superId=' + id + '"><span class="glyphicon glyphicon-expand"></span> Edit</a></td>';
                        row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSuper(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                        row += '</tr>';
                        contentRows.append(row);
                        return;
                    }
                });
            },
            error: function () {
                $('#errorMessages')
                        .append($('<li>')
                                .attr({class: 'list-group-item list-group-item-danger'})
                                .text('Error calling web service.  Please use use exact name.'));
            }
        });

        // clear the previous input for search
        clearSearchCriteria();

    }
}

