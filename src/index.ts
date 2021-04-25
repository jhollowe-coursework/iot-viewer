import { v4 as uuidv4 } from 'uuid';
import { config as AWSConfig, CognitoIdentityCredentials } from 'aws-sdk';
import * as AWSMqttClient from 'aws-mqtt';
import { hosts, addHost, removeHost, displayEvent, cleanTable } from './helpers';

var cfg = {
  identityPoolId: 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx',
  endpoint: 'xxxxxxxxxxxxxx-ats.iot.us-east-1.amazonaws.com',
  region: 'us-east-1',
  idStub: 'web_monitor-'
}

function init() {
  // Initialize the Amazon Cognito credentials provider
  // this allows anonymous users to be assigned a IAM role
  AWSConfig.region = cfg.region;
  AWSConfig.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: cfg.identityPoolId,
  });

  // create the MQTT client
  const client = new AWSMqttClient({
    region: AWSConfig.region,
    credentials: AWSConfig.credentials,
    endpoint: cfg.endpoint,
    // Sign AWS url with expiration of 600 seconds
    expires: 600,
    // create a unique clientId for each page
    clientId: cfg.idStub + uuidv4().split("-")[0],
  })

  // subscribe to all topics once connected
  client.on("connect", () => client.subscribe(["#"]));
  client.on("error", (e: any) => console.log(e));
  // call handleNewMessage() for all received messages
  client.on("message", (topic: string, payload: string) => { handleNewMessage(topic, payload.toString()) });

  // clean up the table when host selection changes
  document.getElementById("hosts").onchange = (e) => cleanTable((e.target as HTMLSelectElement).value);
}

// each new message from MQTT will call this function
function handleNewMessage(t: string, p: string) {

  if (t == "activity/hosts/add") {
    addHost(p);
  }
  else if (t == "activity/hosts/remove") {
    removeHost(p);
  }
  else if (t.match("^hosts/")) {
    var all, h, e;
    // get the host and event from the topic
    [all, h, e] = t.match("/(.*)/(.*)$");

    if (!hosts.has(h)) {
      addHost(h)
    }

    // only display this message if the host is selected
    let selectorElem = document.getElementById("hosts") as HTMLSelectElement;
    if (selectorElem.value == h || selectorElem.value == "*") {
      displayEvent(h, e, p);
    }
  }
}

init();
