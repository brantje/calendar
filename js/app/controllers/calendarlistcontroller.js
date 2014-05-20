/**
 * ownCloud - Calendar App
 *
 * @author Raghu Nayyar
 * @author Georg Ehrke
 * @copyright 2014 Raghu Nayyar <beingminimal@gmail.com>
 * @copyright 2014 Georg Ehrke <oc.list@georgehrke.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

 app.controller('CalendarListController', ['$scope','Restangular','CalendarModel',
 	function ($scope,Restangular,CalendarModel) {

 		$scope.calendars = CalendarModel.getAll();
 		var calendarResource = Restangular.all('v1/calendars');

 		// Gets All Calendars.
 		calendarResource.getList().then(function (calendars) {
 			CalendarModel.addAll(calendars);
 		});

 		// Create a New Calendar
 		$scope.create = function () {
 			calendarResource.post().then(function (calendar) {
 				CalendarModel.add(calendar);
 				$scope.path('/' + calendar.uri);
 			});
 		};

 		// To Delete a Calendar
 		$scope.delete = function (uri,backend) {
 			var calendar = CalendarModel.get(uri);
 			var delcalendarResource = Restangular.one('v1/calendars',backend + '::' + uri);
 			delcalendarResource.remove().then( function () {
 				CalendarModel.remove(calendar);
 			});
 		};
 	}
]);
