export var hosts: Set<string> = new Set();

export function addHost(host: string) {
  var option = document.createElement("option");
  option.id = "hosts_" + host;
  option.value = host;
  option.text = host;
  document.getElementById("hosts").appendChild(option);
  hosts.add(host);
}

export function removeHost(host: string) {
  document.getElementById("hosts_" + host)?.remove();
  hosts.delete(host)
}

// create or update a row in the table for the given event
export function displayEvent(host: string, event: string, value: string) {
  // DEBUG
  // console.log(host, event, value)

  var eventRowElem = document.getElementById(host + "_" + event)
  // if a row for this host_event does not exist, create it
  if (!eventRowElem) {
    var row = document.createElement("tr");
    row.id = host + "_" + event;

    var rH = document.createElement("td");
    rH.classList.add("row-host");
    rH.innerText = host;

    var rE = document.createElement("td");
    rE.classList.add("row-event");
    rE.innerText = event;

    var rV = document.createElement("td");
    rV.classList.add("row-value");
    rV.innerText = value;

    row.appendChild(rH);
    row.appendChild(rE);
    row.appendChild(rV);
    document.getElementById("event-table").appendChild(row);
    eventRowElem = row;
  }
  // update the value for the event
  (eventRowElem.getElementsByClassName("row-value")[0] as HTMLTableDataCellElement).innerText = value;

}

// given the name of a host (or special host identifier), remove all rows that are not for that host
export function cleanTable(host: string) {
  var table = document.getElementById("event-table");
  var rows = table.getElementsByTagName("tr");
  var headerRow = document.getElementById("event-table-header");
  switch (host) {
    case "":
      for (var row of Array.from(rows)) {
        if (row != headerRow) {
          row.remove();
        }
      }
      break;
    case "*":
      return;

    default:
      // keep the header and row for this host
      var rowsToKeep = Array.from(document.querySelectorAll(`[id^="${host}_"]`));
      rowsToKeep.push(headerRow);
      for (var row of Array.from(rows)) {
        if (!rowsToKeep.includes(row)) {
          row.remove();
        }
      }
  }
}
