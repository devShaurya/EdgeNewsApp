# EdgeNewsApp

Expo App for [Topcoder's EdgeNet Challenge Series - Video News Feeds App](https://www.topcoder.com/challenges/1af89a1d-7a29-4617-90f6-675064dc076c).

## Steps to Deploy

1. Clone this repository wherever you like.
2. Run `npm i` command, inside the cloned repo, to install all node packages.
3. Please install **expo** before going any further. You can use instructions present [here](https://docs.expo.dev/get-started/installation/). I will also recommend to install and configure [**ios simulator**](https://docs.expo.dev/workflow/ios-simulator/) and [**android studio emulator**](https://docs.expo.dev/workflow/android-studio-emulator/). Also please install **Expo Go App** in your emulators or simulators or your own device.
4. Run `expo start` to run the code.
5. Use any one of _Tunnel_, _LAN_ or _Local_ URLs to open the app in Expo Go app of your simulators or scan the _QR Code_ for opening app in your device. More related to this can be found [here](https://docs.expo.dev/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet).
6. Sometimes, the code gives fetch-time-out error in the call to retrieve video-urls. If it happens, please close the simulators and terminal and repeat the steps from step-4.
7. Some videos might take too much time to load. For that you can reload the app pressing `r` key in your terminal. If that does not work, please close the simulator and terminal and repeat the steps from step-4.

## Steps followed to add videos

1. Followed all the instructions (except the Sandbox section) given at [this tutorial](https://developer.alefedge.com/get-started/play-your-first-edge-video/5g-video-streaming-tutorial/) by AlefEdge.
2. I used [this](https://developerapis.stg-alefedge.com/api-docs-edgetube/#/Video%20Enablement%20APIs/post_api_v1_stream_tech_content_add) API call to add the videos.3. [This](https://developerapis.stg-alefedge.com/api-docs-edgetube/#/Video%20Enablement%20APIs/get_api_v1_stream_tech_content_get_all) API call is being used in the code to retrieve all the video urls.

## Acknowlegment

Thanks [Topcoder](https://www.topcoder.com/) and [AlefEdge](https://alefedge.com/) for this challenge.
