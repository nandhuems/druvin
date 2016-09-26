	'use strict';
	
	var pocimy = angular.module('app', ['ngMessages', 'angularFileUpload', 'slickCarousel']);
	
	var $serviceUrlLink = 'http://ndot0.com:8080/';
	
	pocimy.config(['slickCarouselConfig', function (slickCarouselConfig) {
		slickCarouselConfig.dots = true;
		slickCarouselConfig.autoplay = false;
	  }]);
	
	pocimy.run(function ($rootScope) {
		$rootScope.$on('scope.stored', function (event, data) {
			console.log("scope.stored", data);
		});
	}); 

	pocimy.factory('Scope', function ($rootScope) {
		var mem = {};
		return {
			store: function (key, value) {
				mem[key] = value;
			},
			get: function (key) {
				return mem[key];
			}
		};
	});
	// $("#contact").hide();
	$("#services-plan").hide();
	$("#portfolio").hide();
	
	

	//-----------------------About Details----------------------------------------------------

	  pocimy.controller('abtusCtrl',['$scope','$http','$window', '$timeout', function($scope, $http, $window, $timeout) {
			
		$scope.currentUser = JSON.parse($window.sessionStorage.getItem('CurrentUser'));
		var $userStatus = $scope.currentUser.userStatus;
		var $userId = $scope.currentUser.userId;
	
		$scope.result = 'hidden'
		$scope.resultMessage;
		$scope.formData; //formData is an object holding the name, email, subject, and message
		$scope.submitButtonDisabled = false;
		$scope.submitted = false;
		
		
	//-----------------------Already Available About Me  Details Onload----------------------------------------------------
		$scope.fetchAboutMeDetails = function(abt_form) {		
					$http({
							method  : 'GET',
							url     : $serviceUrlLink+'pocimy/service/facility/details/'+$userId,
							headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
						})
						.success(function(response){
							 $scope.fetchAboutMeDetailsData = response;
							 $scope.user = $scope.fetchAboutMeDetailsData.facilityName;
							 $scope.add = $scope.fetchAboutMeDetailsData.address;
							 $scope.city1 = $scope.fetchAboutMeDetailsData.city;
						     $scope.web = $scope.fetchAboutMeDetailsData.website;
							 $scope.grp = $scope.fetchAboutMeDetailsData.groupName;
							
						});
					
		}
		
		 if($userStatus=="I"){
			$scope.submit = function(abt_form) {
			$scope.submitted = true;
			$scope.submitButtonDisabled = true;
			  if (abt_form.$valid) {
					var $userID = $scope.currentUser.userId;
					var $facilityName = $scope.facilityName;
					var $groupName = $scope.groupName;
					var $website = $scope.website;
					var $address = $scope.address;
					var $city = $scope.city;
					var $country = "India";
					var $lattitude = $('#lat').val();
					var $longitude = $('#lng').val();
					var $currentPlan = "P";
					
					 $scope.aboutDetails = { 'userId': $userID,
										'facilityName': $facilityName,
										'groupName': $groupName,
										'website': $website,
										'address': $address,
										'city': $city,
										'country': $country,
										'lattitude': $lattitude,
										'longitude': $longitude,
										'currentPlan': $currentPlan
										},
							console.log($scope.aboutDetails);
										
						$http({
							method  : 'POST',
							url     : $serviceUrlLink+'pocimy/service/facility/details/web',
							data    :  $scope.aboutDetails,  
							headers : { 'Content-Type': 'application/json' }  
						}).success(function(response){
						var $abt_msg = response.status;
						$scope.resultMessage = response;
						if ($abt_msg == "SUCCESS") { 
								 $("#services-plan").show();
								 $("#contact").hide();
								 $("#portfolio").hide();
						}else if($abt_msg == "FAIL"){
							//$scope.resultMessage = data;
							var $abt_errmsg =  $scope.resultMessage = response.failurereason;
							$('#abt_sucmsg').empty();
							$('#abt_sucmsg').html($abt_errmsg);
							$scope.result='bg-danger';
						} 
					}).error(function(response){
						var $abt_errmsg =  $scope.resultMessage = response.failurereason;
						$('#abt_sucmsg').empty();
						$('#abt_sucmsg').html($abt_errmsg);
						$scope.result='bg-danger';
					});
					
					
					} else {
						$scope.submitButtonDisabled = false;
						$scope.resultMessage = 'Please fill out all the fields';
						var $msg =  $scope.resultMessage;
						$('#abt_sucmsg').empty();
						$('#abt_sucmsg').html($msg);  
						$scope.result='bg-danger';
					}
			};
			 
		}else if($userStatus=="P" || $userStatus=="C"){
			 $('#geocomplete').attr('disabled', 'disabled');
			$scope.submit = function(abt_form) {
			$scope.submitted = true;
			$scope.submitButtonDisabled = true;
			  if (abt_form.$valid) {
					var $userID = $scope.currentUser.userId;
					var $facilityName = $scope.facilityName;
					var $groupName = $scope.groupName;
					var $website = $scope.website;
					var $address = $scope.address;
					var $city = $scope.city;
					var $country = "India";
					var $currentPlan = "P";
					
					 $scope.aboutDetails = { 'userId': $userID,
										'facilityName': $facilityName,
										'groupName': $groupName,
										'website': $website,
										'address': $address,
										'city': $city,
										'country': $country,
										'currentPlan': $currentPlan
										},	
						$http({
							method  : 'POST',
							url     : $serviceUrlLink+'pocimy/service/facility/details/web',
							data    :  $scope.aboutDetails,  //param method from jQuery
							headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
						}).success(function(response){
						var $abt_msg = response.status;
						$scope.resultMessage = response;
						if ($abt_msg == "SUCCESS") { 
								 $("#services-plan").show();
								 $("#contact").hide();
								 $("#portfolio").hide();
						}else if($abt_msg == "FAIL"){
							//$scope.resultMessage = data;
							var $abt_errmsg =  $scope.resultMessage = response.failurereason;
							$('#abt_sucmsg').empty();
							$('#abt_sucmsg').html($abt_errmsg);
							$scope.result='bg-danger';
						} 
					}).error(function(response){
						var $abt_errmsg =  $scope.resultMessage = response.failurereason;
						$('#abt_sucmsg').empty();
						$('#abt_sucmsg').html($abt_errmsg);
						$scope.result='bg-danger';
					});
					
					
					} else {
						$scope.submitButtonDisabled = false;
						$scope.resultMessage = 'Please fill out all the fields';
						var $msg =  $scope.resultMessage;
						$('#abt_sucmsg').empty();
						$('#abt_sucmsg').html($msg);  
						$scope.result='bg-danger';
					}
			};
		}
		
	  
	   
		$scope.interacted = function(field) {
		  return $scope.submitted || field.$dirty;
		};
		
	  }]);
    
	  pocimy.controller('logOutCtrl',['$scope','$window', function($scope, $window) {
	$scope.logout = function(){
		$scope.currentUser = {"userId" : 0, "userStatus": ''};
		console.log($scope.currentUser);
		$window.sessionStorage.setItem('CurrentUser', JSON.stringify($scope.currentUser));
		$window.location.href = 'index.html';
	};
 }]);
	  
	 
	  
	 //-----------------------PlanSettings Details-------------------------------------------
	 

	  pocimy.controller('abtCtrl', [ '$scope', '$timeout', '$upload', '$window', '$http', 'Scope' ,function($scope, $timeout, $upload, $window, $http, Scope){
		  
			$scope.currentUser = JSON.parse($window.sessionStorage.getItem('CurrentUser'));
			var $userStatus = $scope.currentUser.userStatus;
			var $userId = $scope.currentUser.userId;
			
			$scope.result = 'hidden'
			$scope.resultMessage="";
			
			$scope.formData; //formData is an object holding the name, email, subject, and message
			$scope.submitButtonDisabled = false;
			$scope.submitted = false;
		
			$scope.uploadResult = [];
			$scope.mode = '';
			$scope.selectedIndex = '';
			$scope.hasData = 0;
			$scope.workingHours = {"workingHours":[],
				"currentPlan":"P",
				"userId":$userId,
				"withoutConfirmation" : ($scope.withoutConfirmation) ? 'Y' : 'N'
			};
			$scope.nextInterval = 0;
			$scope.hasData = 0;
			
			//add plan
			$scope.addPlan = function(){
				$scope.mode = 'add';
				console.log($scope.workingHours);
				$scope.workingHour = {
					"days":
							{"sunday":"N","monday":"N","tuesday":"N","wednesday":"N","thursday":"N","friday":"N","saturday":"N"},
					"hours":
							{"am12":"closed","am1":"closed","am2":"closed","am3":"closed","am4":"closed","am5":"closed","am6":"closed","am7":"closed","am8":"closed","am9":"closed","am10":"closed","am11":"closed","pm12":"closed","pm1":"closed","pm2":"closed","pm3":"closed","pm4":"closed","pm5":"closed","pm6":"closed","pm7":"closed","pm8":"closed","pm9":"closed","pm10":"closed","pm11":"closed"},
					"interval": $scope.nextInterval
				};			
			};
			//edit plan
			$scope.editPlan = function(input){
						if(confirm("Do you want to edit the schedule?")){
				$scope.mode = 'edit';
				$scope.selectedIndex = input;
				$scope.workingHour = $scope.workingHours.workingHours[input];
					  }
			};
			
			//remove an item from the plan
			$scope.deletePlan = function(input){
						  if(confirm("Schedule will be deleted permanently, Do you want to continue?")){
				$scope.mode = 'delete';
				$scope.workingHours.workingHours.splice(input,1);	
				$scope.saveAndSubmit();
					  }
			};
			
			//remove an item from the plan
			$scope.deleteAll = function(input){
						   if(confirm("Schedules will be deleted permanently, Do you want to continue?")){ 
						   $scope.mode = 'deleteAll';
				$scope.workingHours.workingHours.splice(0,($scope.workingHours.workingHours.length));
				
				$scope.saveAndSubmit();
						}
			};
						
			$scope.getPlans = function(){
				$scope.workingHours = {"workingHours": [],
				"currentPlan":"P",
				 "userId":$userId
			};
			var maxInterval = 0;
			$scope.withoutConfirmation = false;
			//alert(($.urlParam('loginUserId')));
			
				$http({
				method  : 'GET',
				url     : $serviceUrlLink+'pocimy/service/facility/plansetting/'+$userId,
				headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
				})
				.success(function(data){
					console.log(data);
					$scope.confirmCustomer = data.withoutConfirmation;
					if($scope.confirmCustomer == 'Y'){
						$scope.withoutConfirmation = true;
					}else{
						$scope.withoutConfirmation = false;
					}
	 
					//alert(data.withoutConfirmation);
					if (angular.isDefined(data) && angular.isDefined(data.workingHours) && data.workingHours.length > 0) { //success comes from the return json object
						$scope.workingHours.workingHours = data.workingHours;
						//console.log(data.workingHours);
						angular.forEach(data.workingHours, function (key, value) {
							angular.forEach(key, function (key1, value1) {
							   if (value1 == 'interval') {
									if(key1 > $scope.nextInterval){
										$scope.nextInterval = key1;
									}
								}
							});
						});
						$scope.nextInterval = $scope.nextInterval + 1;
						$scope.hasData = 1;
					}else{
						$scope.nextInterval = 0;
						$scope.hasData = 0;
					} 
				}).error(function(data){
					console.log(data);
				});
			};
			
			$scope.getPlans();
			
		$scope.interacted = function(field) {
		return $scope.submitted || field.$dirty;
		};
		
		$scope.expand = function (input) {
		   var elementId='.monday'+input;
		   $(elementId).toggle(1000);
		   $(".box-title i",this).toggleClass("fa fa-minus");
		};

		//popup related code;
		var planmsg = "plan"; 
		$scope.result = 'hidden'
		$scope.resultMessage;
		$scope.formData; //formData is an object holding the name, email, subject, and message
		$scope.submitButtonDisabled = false;
		$scope.submitted = false;
		$scope.workingHour = {};
		
		$scope.workingHourDayChange = function(value,key){
			switch(value.toLowerCase()){
				case "n" :
					$scope.workingHour.days[key.substr(1,key.length)] = "Y";
					break;	
				case "y" :
					$scope.workingHour.days[key.substr(1,key.length)] = "N";
					break;	
				default :
					$scope.workingHour.days[key.substr(1,key.length)] = "N";
					break;	
					
			}
		};
			
		$scope.workingHourChange = function(value,key){
			var keyX = '';
			switch(key.toLowerCase()){
					case '0012 am' :
						keyX = 'am12';
						break;	
					case '011 am' :
						keyX = 'am1';
						break;	
					case '022 am' :
						keyX = 'am2';
						break;
					case '033 am' :
						keyX = 'am3';
						break;	
					case '044 am' :
						keyX = 'am4';
						break;	
					case '055 am' :
						keyX = 'am5';
						break;	
					case '066 am' :
						keyX = 'am6';
						break;	
					case '077 am' :
						keyX = 'am7';
						break;	
					case '088 am' :
						keyX = 'am8';
						break;	
					case '099 am' :
						keyX = 'am9';
						break;	
					case '1010 am' :
						keyX = 'am10';
						break;	
					case '1111 am' :
						keyX = 'am11';
						break;	
					case '1212 pm' :
						keyX = 'pm12';
						break;	
					case '131 pm' :
						keyX = 'pm1';
						break;	
					case '142 pm' :
						keyX = 'pm2';
						break;	
					case '153 pm' :
						keyX = 'pm3';
						break;	
					case '164 pm' :
						keyX = 'pm4';
						break;	
					case '175 pm' :
						keyX = 'pm5';
						break;	
					case '186 pm' :
						keyX = 'pm6';
						break;	
					case '197 pm' :
						keyX = 'pm7';
						break;	
					case '208 pm' :
						keyX = 'pm8';
						break;							
					case '219 pm' :
						keyX = 'pm9';
						break;							
					case '2210 pm' :
						keyX = 'pm10';
						break;							
					case '2311 pm' :
						keyX = 'pm11';
						break;							
											
					default :
						break;	
				}	
			switch(value.toLowerCase()){
				case "closed" :
					$scope.workingHour.hours[keyX] = "unisex";
					break;
				case "unisex" :
					$scope.workingHour.hours[keyX] = "women";
					break;	
				case "women" :
					$scope.workingHour.hours[keyX] = "closed";
					break;		
				default :
					$scope.workingHour.hours[keyX] = "closed";
					break;			
			}
		};
		
		$scope.validatePlans = function(){
			var isValid = true;
			
			if($scope.workingHours == {}) {
				isValid = false;
				return isValid;
			}
			//alert($scope.workingHours.workingHours.length);
			for(var index=0; index < $scope.workingHours.workingHours.length; index++){
				
				if(index == $scope.selectedIndex) continue;
				console.log("index"+index);
				console.log("select"+$scope.selectedIndex);
				for(index1day in $scope.workingHours.workingHours[index].days){
					for(index1hour in $scope.workingHours.workingHours[index].hours){
						
						var parentCombination = $scope.workingHours.workingHours[index].days[index1day] + ' ' + index1day + ' ' + $scope.workingHours.workingHours[index].hours[index1hour] + ' ' + index1hour;
											
						for(index2day in $scope.workingHour.days){
							for(index2hour in $scope.workingHour.hours){
								if($scope.workingHour.hours[index2hour] != 'closed' && $scope.workingHours.workingHours[index].hours[index1hour] != 'closed'){
									var selectedCombination = $scope.workingHour.days[index2day] + ' ' + index2day + ' ' + $scope.workingHour.hours[index2hour] + ' ' + index2hour;
									
									if(selectedCombination == parentCombination){
										//console.log(selectedCombination);
										isValid = false;
										break;
									}
								}	
							}
							if(!isValid) break;
						}
						if(!isValid) break;
					}
					if(!isValid) break;		
				}
				if(!isValid) break;
			}
			return isValid;
		};
		
		$scope.saveAndSubmit = function() {
		$scope.submitted = true;
		$scope.submitButtonDisabled = true;
		switch($scope.mode){
			case 'add' :
			/* alert($scope.validatePlans());
				if($scope.validatePlans()){ */
					$scope.workingHours.workingHours.push($scope.workingHour);
					// $http({
						// method  : 'POST',
						// url     : $serviceUrlLink+'pocimy/service/facility/plansetting/',
						// data    : $scope.workingHours,  //param method from jQuery
						// headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
					// }).success(function(response){
	                 // //  alert(response);
				      	 // var $planMsg = response.status;
						// if ($planMsg == "SUCCESS") { 
							// $scope.resultMessage = response;
							// $('#plan_sucmsg').empty();
							// $('#plan_sucmsg').html($scope.resultMessage);    
							// setTimeout(function(){
							  // $("#add").modal('hide');
							// }, 1000); 
						// } else{
							// $scope.pendingMsg = response.failurereason;
							// alert($scope.pendingMsg);
							// setTimeout(function(){
							  // $("#add").modal('hide');
							// }, 1000); 
							// }
					// }).error(function(response){
						// $scope.pendingMsg = response.failurereason;
						// alert($scope.pendingMsg);
			      // });
				// }	
			break;
			case 'edit' :
			// alert($scope.validatePlans());
				// if($scope.validatePlans()){
					$scope.workingHours.workingHours.splice($scope.selectedIndex,1,$scope.workingHour);
				//	console.log($scope.selectedIndex,1,$scope.workingHour);
            	/* $http({
						method  : 'POST',
						url     : $serviceUrlLink+'pocimy/service/facility/plansetting/',
						data    : $scope.workingHours,  //param method from jQuery
						headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
					}).success(function(response){
						var $editPlanMsg = response.status;
						if ($editPlanMsg == "SUCCESS") { 
							$scope.resultMessage = response;
							$('#plan_sucmsg').empty();
							$('#plan_sucmsg').html($scope.resultMessage);    
							setTimeout(function(){
							  $("#add").modal('hide');
							}, 1000); 
							
							alert("Changed plan settings will get updated at midnight");
						}else{
							$scope.pendingMsg = response.failurereason;
					    	alert($scope.pendingMsg);
						}
					}); */
				// }
			break;
			case 'delete' :
					console.log($scope.workingHours);
					//console.log(JSON.stringify($scope.workingHours));
					$http({
						method  : 'POST',
						url     : $serviceUrlLink+'pocimy/service/facility/plansetting/',
						data    : $scope.workingHours,  //param method from jQuery
						headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
					}).success(function(response){
						if (response) { 
							$scope.resultMessage = response;
          					} 
					});
			break;
			case 'deleteAll' :
					console.log($scope.workingHours);
					//console.log(JSON.stringify($scope.workingHours));
					$http({
						method  : 'POST',
						url     : $serviceUrlLink+'pocimy/service/facility/plansetting/',
						data    : $scope.workingHours,  //param method from jQuery
						headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
					}).success(function(response){
						if (response) { 
							$scope.resultMessage = response;
						} 
					});
			break;
			default :
			break;
		}
		
		// setTimeout(function(){
			// $scope.getPlans();
		// }, 1000); 
		$("#add").modal('hide');
		$('#plan_sucmsg').empty();
		$('#plan_sucmsg').html($scope.resultMessage);    
		
		};
		$scope.interacted = function(field) {
		  return $scope.submitted || field.$dirty;
		};
		
		 $scope.plansetting = function() {
			console.log($scope.workingHours);
			$scope.totalWorkingHours = {"workingHours":[$scope.workingHours],
				"currentPlan":"P",
				 "userId":$userId,
				 "withoutConfirmation": ($scope.withoutConfirmation) ? 'Y' : 'N'
			};
			 
			 
			 console.log($scope.workingHours);
			 /* 	
				$scope.workingHours1 = {"workingHours":[$scope.workingHours],
				"currentPlan":"P",
				"userId":$userId,
				"withoutConfirmation" : ($scope.withoutConfirmation) ? 'Y' : 'N'
			};
			 
			*/
			
				  
		    var r = confirm("Changed plan settings will get updated at midnight.");
			if (r == true) {
					$scope.workingHours.withoutConfirmation = ($scope.withoutConfirmation) ? 'Y' : 'N';
					$http({
						 method  : 'POST',
						 url     : $serviceUrlLink+'pocimy/service/facility/plansetting/',
						 data    : $scope.workingHours,  //param method from jQuery
						 headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
					})
					 .success(function(response){
						var $planMsg = response.status;
						if ($planMsg == "SUCCESS") { 
							var $plan_sucmsg = "Successfully Saved Your Plans";
							$('#plan_sucmsg1').empty();
							$('#plan_sucmsg1').html($plan_sucmsg);
							$scope.result='bg-success';
							setTimeout(function(){
								$scope.getPlans();
							 }, 2000); 
							 
						} else{
							$scope.pendingMsg = response.failurereason;
							alert($scope.pendingMsg);
						}
					 }).error(function(response){
						 $scope.pendingMsg = response.failurereason;
						 alert($scope.pendingMsg);
					});
				if(confirm("Do you want continue?"))
				{
					$("#services-plan").hide();
					$("#contact").hide();
					$("#portfolio").show();
				}else{
					 $("#services-plan").reload();
				}
			} else {
					return false;
			}
		};
		
		}]);
		

		 //-----------------------Plan Settings Details-------------------------------------
		pocimy.filter('orderDays', function(){
			return function(items){
				var orderedList = {
									"days":
											{"1sunday":"N","2monday":"N","3tuesday":"N","4wednesday":"N","5thursday":"N","6friday":"N","7saturday":"N"}
								  };
			angular.forEach(items,function(value,key){
					switch(key.toLowerCase()){
                        case "sunday" :
					        orderedList.days['1'+key] = value;
					        break;	
						case "monday" :
							orderedList.days['2'+key] = value;
							break;
						case "tuesday" :
							orderedList.days['3'+key] = value;
							break;	
						case "wednesday" :
							orderedList.days['4'+key] = value;
							break;	
						case "thursday" :
							orderedList.days['5'+key] = value;
							break;	
						case "friday" :
							orderedList.days['6'+key] = value;
							break;	
						case "saturday" :
							orderedList.days['7'+key] = value;
							break;	
							
						default :
							break;	
					}
				});	
				return orderedList.days;			
			};
		});
		
	pocimy.filter('orderHours', function(){
		return function(items){
			var orderedList = 	{
								"hours":
									{"0012 am":"closed","011 am":"closed","022 am":"closed","033 am":"closed","044 am":"closed","055 am":"closed","066 am":"closed","077 am":"closed","088 am":"closed","099 am":"closed","1010 am":"closed","1111 am":"closed","1212 pm":"closed","131 pm":"closed","142 pm":"closed","153 pm":"closed","164 pm":"closed","175 pm":"closed","186 pm":"closed","197 pm":"closed","208 pm":"closed","219 pm":"closed","2210 pm":"closed","2311 pm":"closed"}
								};
		angular.forEach(items,function(value,key){
				switch(key.toLowerCase()){
					case "am12" :
						orderedList.hours['0012 am'] = value.toLowerCase();
						break;	
					case "am1" :
						orderedList.hours['011 am'] = value.toLowerCase();
						break;	
					case "am2" :
						orderedList.hours['022 am'] = value.toLowerCase();
						break;
					case "am3" :
						orderedList.hours['033 am'] = value.toLowerCase();
						break;	
					case "am4" :
						orderedList.hours['044 am'] = value.toLowerCase();
						break;	
					case "am5" :
						orderedList.hours['055 am'] = value.toLowerCase();
						break;	
					case "am6" :
						orderedList.hours['066 am'] = value.toLowerCase();
						break;	
					case "am7" :
						orderedList.hours['077 am'] = value.toLowerCase();
						break;	
					case "am8" :
						orderedList.hours['088 am'] = value.toLowerCase();
						break;	
					case "am9" :
						orderedList.hours['099 am'] = value.toLowerCase();
						break;	
					case "am10" :
						orderedList.hours['1010 am'] = value.toLowerCase();
						break;	
					case "am11" :
						orderedList.hours['1111 am'] = value.toLowerCase();
						break;	
					case "pm12" :
						orderedList.hours['1212 pm'] = value.toLowerCase();
						break;	
					case "pm1" :
						orderedList.hours['131 pm'] = value.toLowerCase();
						break;	
					case "pm2" :
						orderedList.hours['142 pm'] = value.toLowerCase();
						break;	
					case "pm3" :
						orderedList.hours['153 pm'] = value.toLowerCase();
						break;	
					case "pm4" :
						orderedList.hours['164 pm'] = value.toLowerCase();
						break;	
					case "pm5" :
						orderedList.hours['175 pm'] = value.toLowerCase();
						break;	
					case "pm6" :
						orderedList.hours['186 pm'] = value.toLowerCase();
						break;	
					case "pm7" :
						orderedList.hours['197 pm'] = value.toLowerCase();
						break;	
					case "pm8" :
						orderedList.hours['208 pm'] = value.toLowerCase();
						break;							
					case "pm9" :
						orderedList.hours['219 pm'] = value.toLowerCase();
						break;							
					case "pm10" :
						orderedList.hours['2210 pm'] = value.toLowerCase();
						break;							
					case "pm11" :
						orderedList.hours['2311 pm'] = value.toLowerCase();
						break;							
											
					default :
						break;	
				}
			});	
			return orderedList.hours;			
		};
	});	
		
	 
	pocimy.controller('DTCtrl',function($scope, $http, $window, Scope) {
	Scope.store('abtCtrl', $scope);	
		
	 });
	  
	  
	
	  //-----------------------Aminity  Details----------------------------------------------------
	  pocimy.controller('aminityCtrl',['$scope', '$timeout', '$http', '$window', 'fileUpload', function($scope, $timeout, $http, $window, fileUpload){
			
		$scope.currentUser = JSON.parse($window.sessionStorage.getItem('CurrentUser'));
		var $userStatus = $scope.currentUser.userStatus;
		var $userId = $scope.currentUser.userId;
		
		$scope.result = 'hidden'
		$scope.resultMessage;
		$scope.formData;
		$scope.submit = function(aminity_form) {
		var $description = $scope.descriptionAmt;

		var $file = $scope.myFile.name;
		 $scope.aminityDetails = { 'userId': $userId,
								   'description': $description,
								   'profilePicture': $file
								 }, 
						$http({
							method  : 'POST',
							url     : $serviceUrlLink+'pocimy/service/facility/amenities',
							data    :  $scope.aminityDetails,  //param method from jQuery
							headers : { 'Content-Type': 'application/json' } 
						}).success(function(response){
						var $aminity_msg = response.status;
						$scope.resultMessage = response;
						if ($aminity_msg == "SUCCESS") { 
							var $amt_sucmsg = "Successfully Register";
							$('#aminity_sucmsg').empty();
							$('#aminity_sucmsg').html($amt_sucmsg);
							$scope.result='bg-success';
						}else if($aminity_msg == "FAIL"){
							//$scope.resultMessage = data;
							var $amt_errmsg =  $scope.resultMessage = response.failurereason;
							$('#aminity_sucmsg').empty();
							$('#aminity_sucmsg').html($amt_errmsg);
							$scope.result='bg-danger';
						} 
					}).error(function(response){
						var $amt_errmsg =  $scope.resultMessage = response.failurereason;
						$('#aminity_sucmsg').empty();
						$('#aminity_sucmsg').html($amt_errmsg);
						$scope.result='bg-danger';
					});		
		};
		
		 $scope.onFileSelect = function() {
		    var file = $scope.myFile;
			var userid = $userId;
			var uploadUrl = $serviceUrlLink+"pocimy/service/facility/amenities/web";
			fileUpload.uploadFileToUrl(file, uploadUrl, userid);
		
		};
		
			$http({
					method  : 'GET',
					url     : $serviceUrlLink+'pocimy/service/facility/amenities/'+$userId,
					headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
				}).success(function(response){
                     $scope.amnDescription = response;
					 $scope.descriptionAmt = response.amenitiesDetails;
				     $scope.fetchImage=response.facilityImageUrls;
                      
					 $scope.currentimg = {"img" : response.facilityImageUrls};
					 $window.localStorage.setItem('CurrentImg', JSON.stringify($scope.currentimg));
					
				var $aminity_msg = response.status;
				if ($aminity_msg == "SUCCESS") { 
					console.log("success");
				}else if($aminity_msg == "FAIL"){
					//$scope.resultMessage = data;
					var $amt_errmsg =  $scope.resultMessage = response.failurereason;
					$('#aminity_sucmsg').empty();
					$('#aminity_sucmsg').html($amt_errmsg);
					$scope.result='bg-danger';
				} 
		
			}).error(function(response){
				var $amt_errmsg =  $scope.resultMessage = response.failurereason;
				$('#aminity_sucmsg').empty();
				$('#aminity_sucmsg').html($amt_errmsg);
				$scope.result='bg-danger';
			});		
		 
		 $scope.interacted = function(field) {
		  return $scope.submitted || field.$dirty;
		};
        
		$scope.currentimg = JSON.parse($window.localStorage.getItem('CurrentImg'));
		$scope.number3 = $scope.currentimg.img;
		
		$scope.slickConfig3Loaded = true;
    $scope.slickConfig3 = {
      method: {},
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
	
	  }]);
	 
	pocimy.directive('fileModel', ['$parse', function ($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;
				
				element.bind('change', function(){
					scope.$apply(function(){
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	}]);

	pocimy.service('fileUpload', ['$http', function ($http) {
		this.uploadFileToUrl = function(file, uploadUrl, userid){
			var fd = new FormData();
			fd.append('file', file);
			fd.append('userid', userid);
			$http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			})
			.success(function(){
			       alert("Image is Successfully Uploaded")
			       location.reload();
			})
			.error(function(){
			});
		}
	}]);
	 
	  

//-----------------------MyProfile / About Details----------------------------------------------------

	  pocimy.controller('myProfileCtrl',['$scope','$http','$window', '$timeout', function($scope, $http, $window, $timeout) {
	
		$scope.currentUser = JSON.parse($window.sessionStorage.getItem('CurrentUser'));
		var $userStatus = $scope.currentUser.userStatus;
		var $userId = $scope.currentUser.userId;
		$scope.result = 'hidden'
		$scope.resultMessage;
		$scope.formData; //formData is an object holding the name, email, subject, and message
		$scope.submitButtonDisabled = false;
		$scope.submitted = false;
		$('#geocomplete').attr('disabled', 'disabled');
		
		$scope.user = $("#facilityName").val();
		//alert($scope.user);
    
			$scope.submit = function(abt_form) {
			$scope.submitted = true;
			$scope.submitButtonDisabled = true;
			  if (abt_form.$valid) {
					var $userID = $scope.currentUser.userId;
					var $facilityName = $scope.user;
					var $groupName = $scope.groupName;
					var $website = $scope.website;
					var $address = $scope.add;
					var $city = $scope.city1;
					var $country = "India";
					var $currentPlan = "P";
					
					 $scope.aboutDetails = { 'userId': $userID,
										'facilityName': $facilityName,
										'groupName': $groupName,
										'website': $website,
										'address': $address,
										'city': $city,
										'country': $country,
										'currentPlan': $currentPlan
										},
									
						$http({
							method  : 'POST',
							url     : $serviceUrlLink+'pocimy/service/facility/details/web',
							data    :  $scope.aboutDetails,  //param method from jQuery
							headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
						})
						.success(function(response){
						var $abt_msg = response.status;
						$scope.resultMessage = response;
					
						
						if ($abt_msg == "SUCCESS") { 
								$('#abt_sucmsg').empty();
								$('#abt_sucmsg').html("Changes are updated successfully");
								$scope.result='bg-success';
						}else if($abt_msg == "FAIL"){
							//$scope.resultMessage = data;
							var $abt_errmsg =  $scope.resultMessage = response.failurereason;
							$('#abt_sucmsg').empty();
							$('#abt_sucmsg').html($abt_errmsg);
							$scope.result='bg-danger';
						} 
					}).error(function(response){
						var $abt_errmsg =  $scope.resultMessage = response.failurereason;
						$('#abt_sucmsg').empty();
						$('#abt_sucmsg').html($abt_errmsg);
						$scope.result='bg-danger';
					});
					
					
					} else {
						$scope.submitButtonDisabled = false;
						$scope.resultMessage = 'Please fill out all the fields';
						var $msg =  $scope.resultMessage;
						$('#abt_sucmsg').empty();
						$('#abt_sucmsg').html($msg);  
						$scope.result='bg-danger';
					}
			};
			 
		
	  //-----------------------Already Available About Me  Details Onload----------------------------------------------------
		$scope.fetchAboutMeDetails = function(abt_form) {		
					$http({
							method  : 'GET',
							url     : $serviceUrlLink+'pocimy/service/facility/details/'+$userId,
							headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
						})
						.success(function(response){
							$scope.fetchAboutMeDetailsData = response;
							$scope.user = $scope.fetchAboutMeDetailsData.facilityName;
							$scope.add = $scope.fetchAboutMeDetailsData.address;
							$scope.city1 = $scope.fetchAboutMeDetailsData.city;
							$scope.web = $scope.fetchAboutMeDetailsData.website;
							$scope.grp = $scope.fetchAboutMeDetailsData.groupName;
						});
					
		}
	   
		$scope.interacted = function(field) {
		  return $scope.submitted || field.$dirty;
		};
		
	  }]);
	  
	  
	