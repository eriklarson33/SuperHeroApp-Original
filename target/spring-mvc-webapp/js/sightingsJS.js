/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//raw Date = new 

$(document).ready(function () {

    loadSightings();



});



function loadSightings() {
    var contentRows = $('#contentRows');

    var date;

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/HEROdb/showSightings',
        success: function (data, status) {
            $.each(data, function (index, sighting) {
                var name = sighting.name;
                var description = sighting.description;
                var rawDate = sighting.sightingDate;
                console.log(sighting.sightingDate);
                createDate();
                var id = sighting.sightingId;
                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + description + '</td>';
                row += '<td>' + date + '<td>';
                //row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                row += '<td><a role="button" id="profileButton" class="btn btn-warning" href="displaySiteProfile?siteId=' + id + '"><span class="glyphicon glyphicon-expand"></span> View / Edit Sighting</a></td>';
                //row += '<td><a onclick="deleteContact(' + id + ')">Delete</a></td>';
                //row += '<td><a role="button" id="editButton" class="btn btn-primary" href="displayProfile?superId=${' + id + '}"><span class="glyphicon glyphicon-expand"></span> Edit</a></td>';
                row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSighting(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                row += '</tr>';
                contentRows.append(row);

                var rawDate;

                function createDate() {
                    var year = rawDate.year;
                    var month = rawDate.month;
                    var day = rawDate.dayOfMonth;
                    date = (month + " " + day + ", " + year);
                }
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

function clearSightingTable() {
    $('#contentRows').empty();
}


function getSearchRequest() {
// we need to clear the previous content so we don't append to it
    clearSightingTable();
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

    var contentRows = $('#contentRows');

    var date;

    if (search === "showSightings") {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/' + search + '/',
            success: function (data, status) {
                $.each(data, function (index, sighting) {
                    var name = sighting.name;
                    var description = sighting.description;
                    var rawDate = sighting.sightingDate;
                    console.log(sighting.sightingDate);
                    createDate();
                    var id = sighting.sightingId;
                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + description + '</td>';
                    row += '<td>' + date + '<td>';
                    row += '<td><a role="button" id="profileButton" class="btn btn-warning" href="displaySiteProfile?siteId=' + id + '"><span class="glyphicon glyphicon-expand"></span> View / Edit Sighting</a></td>';
                    row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSighting(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                    row += '</tr>';
                    contentRows.append(row);

                    var rawDate;

                    function createDate() {
                        var year = rawDate.year;
                        var month = rawDate.month;
                        var day = rawDate.dayOfMonth;
                        date = (month + " " + day + ", " + year);
                    }
                });

            },
            error: function () {
                $('#errorMessages').append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service.  Please try again later.'));
            }
        });

    } else if (search === "showSightingsLimit10") {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/' + search + '/',
            success: function (data, status) {
                $.each(data, function (index, sighting) {
                    var name = sighting.name;
                    var description = sighting.description;
                    var rawDate = sighting.sightingDate;
                    console.log(sighting.sightingDate);
                    createDate();
                    var id = sighting.sightingId;
                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + description + '</td>';
                    row += '<td>' + date + '<td>';
                    row += '<td><a role="button" id="profileButton" class="btn btn-warning" href="displaySiteProfile?siteId=' + id + '"><span class="glyphicon glyphicon-expand"></span> View / Edit Sighting</a></td>';
                    row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSighting(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                    row += '</tr>';
                    contentRows.append(row);

                    var rawDate;

                    function createDate() {
                        var year = rawDate.year;
                        var month = rawDate.month;
                        var day = rawDate.dayOfMonth;
                        date = (month + " " + day + ", " + year);
                    }
                });

            },
            error: function () {
                $('#errorMessages').append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service.  Please try again later.'));
            }
        });
    } else if (search === "sightingBySuperId") {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/sightingBySuperId/' + criteria,
            success: function (data, status) {
                $.each(data, function (index, sighting) {
                    var name = sighting.name;
                    var description = sighting.description;
                    var rawDate = sighting.sightingDate;
                    console.log(sighting.sightingDate);
                    createDate();
                    var id = sighting.sightingId;
                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + description + '</td>';
                    row += '<td>' + date + '<td>';
                    row += '<td><a role="button" id="profileButton" class="btn btn-warning" href="displaySiteProfile?siteId=' + id + '"><span class="glyphicon glyphicon-expand"></span> View / Edit Sighting</a></td>';
                    row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSighting(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                    row += '</tr>';
                    contentRows.append(row);

                    var rawDate;

                    function createDate() {
                        var year = rawDate.year;
                        var month = rawDate.month;
                        var day = rawDate.dayOfMonth;
                        date = (month + " " + day + ", " + year);
                    }
                });

            },
            error: function () {
                $('#errorMessages').append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text("Enter the Super Human's Id"));
            }
        });
    } else if (search === 'sightingByDate') {
        
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/HEROdb/sightingsByDate/' + criteria,
            success: function (data, status) {
                $.each(data, function (index, sighting) {
                    var name = sighting.name;
                    var description = sighting.description;
                    var rawDate = sighting.sightingDate;
                    console.log(sighting.sightingDate);
                    createDate();
                    var id = sighting.sightingId;
                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + description + '</td>';
                    row += '<td>' + date + '<td>';
                    row += '<td><a role="button" id="profileButton" class="btn btn-warning" href="displaySiteProfile?siteId=' + id + '"><span class="glyphicon glyphicon-expand"></span> View / Edit Sighting</a></td>';
                    row += '<td><a role="button" id="deleteButton" class="btn btn-danger" onclick="deleteSighting(' + id + ')"><span class="glyphicon glyphicon-warning"></span>Delete</a></td>';
                    row += '</tr>';
                    contentRows.append(row);

                    var rawDate;

                    function createDate() {
                        var year = rawDate.year;
                        var month = rawDate.month;
                        var day = rawDate.dayOfMonth;
                        date = (month + " " + day + ", " + year);
                    }
                });

            },
            error: function () {
                $('#errorMessages').append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text("Enter the Date in format YYYY-MM-DD"));
            }
        });
    }

}

function deleteSighting(id) {

    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:8080/HEROdb/deleteSighting/' + id,
        success: function () {
            clearSightingTable();
            loadSightings();
        },
        error: function () {
            $('#errorMessages')
                    .append($('<li>')
                            .attr({class: 'list-group-item list-group-item-danger'})
                            .text('Error calling web service.  Please try again later.'));
        }
    });

}


