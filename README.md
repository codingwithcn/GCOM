# GCOM - General Communication
GCOM is a simple flask template, for allowing comments on your website with only 18 simple line of code


__Steps To Add Comments To A Route__
>1. Create the html document where you would like to put the comment section in.
>2. Once that is done, you will have to add the following piece of code.
```html:
<!--This is used to style your document-->
<style id='get_GCOM_STYLE'></style>

<!-- This is where your comment section will be loaded in -->
<div id='comment_section' class='comment_section'></div>

<!-- where your logic of your comment section will be loaded in -->
<script id='get_GCOM_SCRIPT'></script>
<script>
    // Fetch the file contents of GCOM js and css from server, and then loads it into the corresponding elements... Would not load correctly if the API_KEY is not correct
      fetch('/get_GCOM',
      { method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Change the API_KEY to the correct key...
        // This is the default API_KEY
        body: JSON.stringify({API_KEY: 'asdasdasdasdad211312312sadasd21224656789765432asdasdasda12vsdvshry534a'})
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById("get_GCOM_STYLE").innerHTML = data['style'];
        // Change the API_KEY to the correct key...
        // This is the default API_KEY
        document.getElementById('get_GCOM_SCRIPT').innerHTML = "var API_KEY = 'asdasdasdasdad211312312sadasd21224656789765432asdasdasda12vsdvshry534a';"+data['data']
      });
  </script>
```

__HINT__: 
>If you are stuck on what exactly to do... look at the test_template.html file which shows the correct way to properly load and add in the elements needed.

__If Done Correctly__:
>If you do it all correctly you document should look a little something like this.
