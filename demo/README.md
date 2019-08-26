# rise-video demo

## Install polymer tools

This needs to be done just once per machine.

```bash
npm install -g polymer-cli@1.9.7
```

**Note**: If EPERM errors occur then install polymer-cli using the
`--unsafe-perm` flag ( `npm install -g polymer-cli@1.9.7 --unsafe-perm` )
and/or using sudo.

## Build instructions

Create a standalone project using the contents of this directory as a base.

Then run:

```
npm install
polymer build
```

The 'polymer build' command needs to be run after each change to the source
code.

The output is created into the build/prod directory.

## Run instructions

### Option a) Use local web server and run directly in Chrome browser

To do this, first uncomment this line in src/rise-video.html

`// videos.forEach( el => RisePlayerConfiguration.Helpers.sendStartEvent( el ) );`

and run:

`polymer build`

Once build completes, run a web server locally, one could run the following commands:

```
cd build/prod
python -m SimpleHTTPServer 8999
```

Then go to http://localhost:8999/src/rise-video.html in Chrome browser.

**Note:** __Because `rise-video` relies on RLS to download video files, it's not possible to test playback of videos locally. If you need to test video playback, refer to the Chrome browser instructions below.__

### Option b) Running the ChromeOS app in Chrome browser

To do this all the contents of build/prod may be uploaded to GCS,
with public permissions and no caching. To avoid CORS issues, the server
domain of the published file must be risevision.com.

Then create a schedule that points to the published file, for example:

  http://widgets.risevision.com/staging/pages/2018.XX.XX.XX.XX/src/rise-video.html

Note that this is an HTTP URL, as ChromeOS Player currently requires that.

Then configure the local environment as described in the
[Help Article](https://docs.google.com/document/d/1QbyrUlHjLzADYBxuKEkNglhVAPxP4f3WXVjbPQOXXvM). It's not necessary to point the schedule to a local URL as it's described there, with the above URL for the schedule is enough.
