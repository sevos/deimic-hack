var serverIp = "192.168.1.80";
var totalTime = 300;
 
var sleepTime = 150;
var requestTime = 100;

var i, currentTime;

var endTime = get_time_t() + totalTime;

for (currentTime = get_time_t(); currentTime < endTime; currentTime = get_time_t()) {
  var outputs = send_receive_tcp_time(serverIp, 7777, "getOuts\n",  requestTime / 100);

  if (outputs !== undefined && outputs.length == 77) {
    printstr(outputs);
    var circuts = outputs.split(":");
    if (circuts.length == 39) {
      for (i = 0; i < circuts.length; i++) {
        var currentValue = get_output(1, i);
        var expectedValue = Integer.parseInt(circuts[i]);
  
        if (currentValue != expectedValue) {
          printstr("Toggling output");
          printnum(i);
          if (expectedValue == 1) {
            set_output_on(1, i);
          } else {
            set_output_off(1, i);
          }
        }
      }
    }
  } else {
    printstr("No data");
  }

  msleep(sleepTime);
}