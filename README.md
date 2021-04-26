# iot-viewer
A website using AWS IoT Core's MQTT to view various monitored metrics of hosts


## Getting Started

### Environment

#### Devcontainer (Recommended)
1. Install Docker ([Instructions](https://www.docker.com/get-started))
2. Install Visual Studio Code ([Instructions](https://code.visualstudio.com/download))
3. Install the ["Remote - Containers" extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
4. Clone this repository into a container ([Instructions](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers))

#### Manual Installation

1. Install Node.js ([Instructions](https://nodejs.org/en/download/))
2. Install Yarn ([Instructions](https://yarnpkg.com/getting-started/install))
3. clone this repo with `git clone https://github.com/jhollowe/iot-viewer.git`
4. Install dependencies with `yarn install` (running in this repo's directory)

### Configuration

1. Edit `src/index.ts` and add your Cognito identity pool ID to the cfg object at the top
2. Edit `src/index.ts` file with the endpoint for your thing (look in the "Interact" section of your Thing in the AWS console)
3. Edit the region if needed

### Execution

1. Run a development server using `yarn run serve`
2. Open your browser to the URL displayed (defaults to http://localhost:8080)
