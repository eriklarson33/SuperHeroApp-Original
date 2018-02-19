<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Sightings</title>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="container" id="main">
            <div class="navbar navbar-inverse">
                <div class="container-fluid">

                    <ul class="nav nav-tabs">
                        <li role="presentation">
                            <a href="${pageContext.request.contextPath}/">
                                Home
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="${pageContext.request.contextPath}/superHeroesAndVillains">
                                Super Heroes and Villains
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="${pageContext.request.contextPath}/organizations">
                                Organizations
                            </a>
                        </li>
                        <li role="presentation" class="active">
                            <a href="${pageContext.request.contextPath}/sightings">
                                Sightings
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="${pageContext.request.contextPath}/superPowers">
                                Super Powers
                            </a>
                        </li>
                    </ul> <!-- end navbar ul -->
                </div> <!-- end div container -->
            </div> <!-- end class navbar -->

            <!-- Main Page Content Start -->
            <br/>
            <ul class="list-group" id="errorMessages"></ul>
            <div class="row">
                <form class="form-inline col-md-6" onsubmit="return false" role="form">

                    <div class="form-group ">
                        <div class="form-group">

                            <select class="btn btn-primary" id="requestedSearch" name="Search">
                                <option value="showSightings">Show All</option>
                                <option value="showSightingsLimit10" selected="selected">Latest 10 Sightings</option>
                                <option value="sightingBySuperId">Sighting By Super Id</option>
                                <option value="sightingByDate">Sighting By Date</option>
                            </select>

                            <input type="search" size="23" class="form-control" id="searchCriteria" name="searchCriteria" placeholder="Enter Search Criteria here ...">
                            <button class="btn btn-primary" type="submit" onclick="getSearchRequest()">Search ! <span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>

                        </div>

                    </div>

                </form>
                <div class="col-md-6"></div>
            </div>  <!-- end search Row -->

            <!-- 
            Add a row to our container - this will hold the summary table and the
            new contact form.
            -->


            <div class="row">
                <!--
                Add a col to hold the summary table - have it take up half the row
                -->
                <div class="col-md-6">
                    <h2>Sightings</h2>
                    <table id="sightingsTable" class="table table-hover">
                        <tr>
                            <th width="25%">Sighting Name</th>
                            <th width="51%">Description</th>
                            <th width="8%">Date</th>
                            <th width="8%"></th>
                            <th width="8%"></th>
                        </tr>
                        <tbody id="contentRows"></tbody>
                    </table>
                </div> <!-- end col div -->

                <!--
                Add col to hold the new contact form - have it take up the other 
                half of the row
                -->
                <div class="col-md-6">
                    <h2>Add New Sighting</h2>
                    <form class="form-horizontal"
                          role="form" method="POST"
                          action="createSighting">
                        <div class="form-group">
                            <label for="add-name" class="col-md-2 control-label">
                                Name:
                            </label>
                            <div class="col-md-10">

                                <input type="text" class="form-control" name="siteName"
                                       placeholder="Name or Identification" 
                                       maxlength="30"  required="required"/>

                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-description" class="col-md-2 control-label">
                                Description:
                            </label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" name="description"
                                       placeholder="A Description of sighting." 
                                       maxlength="100" required/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="add-street" class="col-md-2 control-label">
                                Street:
                            </label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" name="street"
                                       placeholder="Street Address." 
                                       maxlength="30" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-city" class="col-md-2 control-label">
                                City:
                            </label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" name="city"
                                       placeholder="city of the sighting" 
                                       maxlength="20" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-state" class="col-md-2 control-label">
                                State:
                            </label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" name="state"
                                       placeholder="State in which the super human(s) was sited." 
                                       maxlength="20" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-zip" class="col-md-2 control-label">
                                Zip:
                            </label>
                            <div class="col-md-10">
                                <input type="number" class="form-control" name="zip"
                                       placeholder="zip" 
                                       maxlength="10" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-latitude" class="col-md-2 control-label">
                                Latitude:
                            </label>
                            <div class="col-md-10">
                                <input type="number" step="0.0001" class="form-control" name="latitude"
                                       placeholder="latitude" maxlength="9" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-longitude" class="col-md-2 control-label">
                                Longitude:
                            </label>
                            <div class="col-md-10">
                                <input type="number" step="0.0001" class="form-control" name="longitude"
                                       placeholder="longitude" maxlength="9" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-date" class="col-md-2 control-label">
                                Date:
                            </label>
                            <div class="col-md-10">
                                <input type="text" id='add-date' class="form-control" name="sightingDate" 
                                       required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                       placeholder="'YYYY-MM-DD'  Date of the sighting." required/>
                                <!-- required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" -->

                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-offset-2 col-md-10">
                                <input type="submit" class="btn btn-default" 
                                       value="Create Sighting"/>
                            </div>
                        </div>
                    </form>

                </div> <!-- End col div -->

            </div> <!-- End row div -->

            <!-- Main Page Content Stop -->
        </div>  <!-- end class container -->

        <!-- Placed at the end of the document so the pages load faster -->
        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="js/sightingsJS.js" ></script>
    </body>
</html>
