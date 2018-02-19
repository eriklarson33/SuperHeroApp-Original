<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!-- Directive for Spring Form tag libraries -->
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Super Heroes and Villains</title>
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
                        <li role="presentation"  class="active"  >
                            <a href="${pageContext.request.contextPath}/superHeroesAndVillains">
                                Super Heroes and Villains
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="${pageContext.request.contextPath}/organizations">
                                Organizations
                            </a>
                        </li>
                        <li role="presentation">
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
                </div>
            </div> <!-- end div container -->

            <!-- Main Page Content Start -->
            <br/>
            <ul class="list-group" id="errorMessages"></ul>
            <div class="row">
                <form class="form-inline col-md-6" onsubmit="return false" role="form">

                    <div class="form-group ">
                        <div class="form-group">

                            <select class="btn btn-primary" id="requestedSearch" name="Search">
                                <option value="showAllSupers" selected="selected">Show All</option>
                                <option value="nameSearch">Find by Exact Name</option>
                                <option value="findById">Find Super Human by Id</option>
                                <option value="findByOrg">Find by Organization Id</option>
                                <option value="findBySighting">Find by Sighting Id</option>
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
                    <h2>Super Heroes and Villains<span id="titleAddition"></span></h2>
                    <table id="superHumanTable" class="table table-hover">
                        <tr>
                            <th width="25%">Super Human Name</th>
                            <th width="50%">Description</th>
                            <th width="9%"></th>
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
                    <h2>Add New Super Human</h2>
                    <form class="form-horizontal"
                          role="form" method="POST"
                          action="createSuperHuman">
                        <div class="form-group">
                            <label for="add-name" class="col-md-4 control-label">
                                Name:
                            </label>
                            <div class="col-md-8">

                                <input type="text" class="form-control" name="superHumanName"
                                       placeholder="Name or Identity" maxlength="20" required/>

                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-description" class="col-md-4 control-label">
                                Description:
                            </label>
                            <div class="col-md-8">
                                <textarea rows='2' class="form-control" name="description"
                                          placeholder="A Description of who the super is or what they stand for." 
                                          maxlength="100" required></textarea>
                            </div>
                        </div>



                        <div class="form-group">
                            <div class="col-md-offset-4 col-md-8">
                                <input type="submit" class="btn btn-default" 
                                       value="Create Super Human"/>
                            </div>
                        </div>
                    </form>

                </div> <!-- End col div -->

            </div> <!-- End row div -->

            <!-- Modal -->


            <!-- Main Page Content Stop -->

            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Super Human Profile: 

                            </h4>

                        </div>
                        <form class="form-horizontal" role="form"
                              action="editHERO" method="POST">
                            <div class="modal-body">


                                <div class="form-group">
                                    <label for="profile-super-name" class="col-md-3 control-label">
                                        Super's Name:
                                    </label>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" id="profile-super-name"placeholder="Name or Identity"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="profile-super-id" class="col-md-3 control-label">
                                        Registration ID: 
                                    </label>
                                    <div class="col-md-9"> 
                                        <input type="text" class="form-control" id="profile-super-id" placeholder="Super's Registration ID." readonly/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="profile-description" class="col-md-3 control-label">
                                        Description:
                                    </label>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" id="profile-description" placeholder="Description of the Super or what they stand for."/>
                                    </div>
                                </div>

                                <div class="checkbox form-group">
                                    <label for="listOfSuperPowers" class="col-md-3 control-label">
                                        Super Powers:
                                    </label>
                                    <div class="col-md-9" id="listOfSuperPowers">
                                    </div>
                                </div>

                                <div class="checkbox form-group">
                                    <label for="profile-organizations" class="col-md-3 control-label">
                                        Organizations:
                                    </label>
                                    <div class="col-md-9" id="profileOrganizations">
                                    </div>
                                </div>

                                <div class="checkbox form-group">
                                    <label for="profile-sightings" class="col-md-3 control-label">
                                        Sightings:
                                    </label>
                                    <div class="col-md-9" id="profileSightings">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
<!--                                <a role="button" id="edit-button" class="btn btn-primary">
                                    Update HERO
                                </a>-->
                            </div>

                        </form>

                    </div>
                </div> <!-- end model dialogue -->

                <!--            <div class="form-group">
                                <div class="col-md-offset-4 col-md-8">
                                    <input type="submit" class="btn btn-default" 
                                           value="Update Contact"/>
                                </div>
                            </div>-->

            </div> <!-- end id="myModal class="modal fade"-->


        </div>  <!-- end class container -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="js/superHumansJS.js" ></script>
    </body>
</html>
