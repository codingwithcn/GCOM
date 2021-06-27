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

![Screenshot 2021-06-26 203726](https://user-images.githubusercontent.com/67172682/123529467-6d406880-d6be-11eb-9b6e-831be83f9d4e.png)


__Benefits Of Using GCOM__
>1. GCOM can easily be turned into a API, that will let other users add comments into their website, as long as they have been giving a API_KEY
>2. GCOM manages all the backend, being the Adding, Grabing, and loading of comments. So the only real issue you need to care about is the design of how you want the comments to be laid out.

__Final Comments__:
>1. GCOM is free to use for any purpose what so ever, and it comes as is.
>2. If you would like to change the looks of GCOM comments section. This are the following css classess that you can use to help you change it:

>>1. comment_section: This is the container of the comment_view, comment_label, and add_comment_sec classes;
>>2. comment_view: This is the container that holds all the loaded comments
>>3. comment_label: This is just a h1 element class, that helps position the h1 tag that says "Comments"
>>4. add_comment_sec: This is a container for small_comment, and form_cont
>>5. small_comment: This is a small element class, that helps position the small tag that says ""Fields marked with (*) are required""
>>6. form_cont: This is a container for name_cont, message_cont, and form_cont_but
>>7. name_cont: Container for name_label and name_input
>>8. message_cont: Container for message_label and message_input
>>9. form_cont_but: Button that sends comment to server to add it to the database
>>10. Comment_CONTAINER: This class holds a loaded comment... Being when a new comment is grabbed from server, the comment is given a class of Comment_CONTAINER... Comment_CONTAINER holds the name of the person that posted the comment, and the comment being posted. message_c is the class give to the comment being posted

>3. If they are any question, you can reach me at: codingwithcn@gmail.com
