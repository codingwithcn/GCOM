var comment_section = document.getElementById("comment_section");
// We do not want to load anything until we start
// recieve feed from server.
// So for now we just want to create the div element
let comments_label = document.createElement('h1');
comments_label.innerHTML = 'Comments';
comments_label.id = 'comments_label';
comments_label.className = 'comments_label'; 
comment_section.appendChild(comments_label);

// Creating were the user will see all the comments
let comment_view = document.createElement('div');
comment_view.className = 'comment_view';
comment_view.id = 'comment_view';
comment_section.appendChild(comment_view);

// Allowing user to be able to add comments to database
let add_comment_sec = document.createElement('div');
add_comment_sec.className = 'add_comment_sec';
add_comment_sec.id = 'add_comment_sec';

// add_comment_sec contents 
let small_comment = document.createElement('small');
small_comment.innerHTML = 'Fields marked with an asterisk (*) are required.';
small_comment.className = 'small_comment';
small_comment.id = 'small_comment';
add_comment_sec.appendChild(small_comment);


let form_cont = document.createElement('div');
form_cont.id = 'form_cont';
form_cont.className = 'form_cont';

let name_cont = document.createElement('div');
name_cont.className = 'name_cont';
name_cont.id = 'name_cont';

let name_label = document.createElement('label');
name_label.className='name_label';
name_label.id='name_label';
name_label.innerHTML = 'Name:';
name_cont.appendChild(name_label);

let name_input = document.createElement('input');
name_input.className = 'name_input';
name_input.id = 'name_input';
name_cont.appendChild(name_input);

form_cont.appendChild(name_cont);


let message_cont = document.createElement('div');
message_cont.className = 'message_cont';
message_cont.id = 'message_cont';


let message_label = document.createElement('label');
message_label.className ='message_label';
message_label.id='message_label';
message_label.innerHTML = 'Comment (*):';

message_cont.appendChild(message_label);

let message_input = document.createElement('textarea');
message_input.className = 'message_input';
message_input.id = 'message_input';
message_input.style='margin: 0px; width: 862px; height: 117px;'


message_cont.appendChild(message_input);

form_cont.appendChild(message_cont);

let form_cont_but = document.createElement('button');
form_cont_but.className = 'form_cont_but';
form_cont_but.id = 'form_cont_but';
form_cont_but.innerHTML = 'Submit';
form_cont_but.addEventListener("click", function() {
    add_comment()
});

form_cont.appendChild(form_cont_but);
add_comment_sec.appendChild(form_cont);

comment_section.appendChild(add_comment_sec);


const load_comments = () => {
    let comment_view = document.getElementById('comment_view');
    let previous_comments = [];
    var eventsource = new EventSource('/grab/comments?URL='+ window.location.href+"&API_KEY="+API_KEY);
    eventsource.onmessage = function(e){
        let data = eval(e.data);
        data = data.slice(previous_comments.length)
        for (let i = 0; i < data.length; i++) {
            let name = data[i]['name']+":"

            let message = data[i]['message']

            let container = document.createElement('div')
            container.className ='Comment_CONTAINER';

            let name_c = document.createElement('h4');
            name_c.innerHTML = name;
            name_c.className = 'name_c';
            container.appendChild(name_c);

            let message_c = document.createElement('h4');
            message_c.innerHTML = message;
            message_c.className = 'message_c';
            container.appendChild(message_c);

            comment_view.prepend(container)
            previous_comments.push(data[i])
        }
    }
}

const add_comment = () => {
    let name_input = document.getElementById('name_input');
    let message_input = document.getElementById('message_input');
    if (message_input.value.length == 0){
        alert("Please type a comment in")
    }else {
        let val_name = name_input.value.length >=1? name_input.value : "Default";
        fetch('/set_GCOM',
        {   method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                API_KEY: API_KEY,
                Message: message_input.value,
                name: val_name,
                URL: window.location.href
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            if (data['return'] == 'Success') {
                name_input.value = '';
                message_input.value = '';
            }else if (data['return'] == 'Incorrect API_KEY'){
                alert("Incorrect API_KEY. Problem Sending Comment")
            }
        });
        }
}


load_comments()