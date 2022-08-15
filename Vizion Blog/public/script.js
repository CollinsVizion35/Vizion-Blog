console.log("HDcomments init");



const iconBtn = document.getElementById('icon');
const hdcEmojiBtn = document.getElementById('emoji');
const arrowFill = document.getElementById('arrow-emoji');
const hdcComment = document.getElementById('hdc-comment-input');
const hdcName = document.getElementById('hdc-name-input');
const hdcSubmit = document.getElementById('hdc-submit');
const hdcEmail = document.getElementById('hdc-email-input');
const hdcReactions = document.getElementsByClassName('hdc-reaction');
const alertComment = document.getElementById('alertComment');
const hdcUpVote = document.getElementsByClassName('ri-heart-2-line');
const hdcDownVote = document.getElementsByClassName('ri-heart-2-fill');
const parentElement = document.getElementById('hdc-comment-showBox');
const commentss = document.querySelectorAll('.hdc-create-comments');







// toggle emoji box
iconBtn.addEventListener('click', () => {
    hdcEmojiBtn.classList.toggle('activated');
    arrowFill.classList.toggle('activated');
});



let canSubmit = false;
let reaction = null;



function hdc_can_submit () {
    //check the required field

    let comment = hdcComment.value.trim();
    let email = hdcEmail.value.trim();
    let name = hdcName.value.trim();

    if (comment.length > 4 && email.length > 4 && name.length > 4) {
        alertComment.style.visibility = "hidden";
        if (hdc_validateEmail(email)) {
            hdcSubmit.classList.add('activated');
            hdcSubmit.disabled = false;
            canSubmit = true;
            
        }else {
            hdc_disabled_submit();
        }
    } else {
        alertComment.style.visibility = "visible";
        hdc_disabled_submit();
    }
};

function hdc_disabled_submit() {
            hdcSubmit.classList.remove('activated');
            hdcSubmit.disabled = true;
            canSubmit = false;
};

// select Emoji
function hdc_select_reaction() {
    reaction = this.getAttribute("data-reaction");
    let prev = document.getElementsByClassName('emoji-selected')[0];
    if (prev) {
        prev.classList.remove('emoji-selected')
    }
    this.classList.add('emoji-selected');
    console.log('siuuuu')
};



// like or unlike

function hdc_vote(el,vote) {

        
        let commentID = el.getAttribute('data-id');
        let score = document.getElementsByClassName('hdc_vote_' + commentID)[0].innerText;
        score = parseInt(score);
        if (vote) {
            score = score + 1;
        } else {
            score = score - 1;
        }
    
        if (score > 0) {
            score =  + score;
        } 
        document.getElementsByClassName('hdc_vote_' + commentID)[0].innerText = score;
    
    
    }


 







    // Date
    const date = new Date();

    const months = ["January", "Febuary", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

    const month = months[date.getMonth()];



    const realDate = date.getDate() + ' '  + month + ',' + date.getFullYear();

    console.log(realDate);

    // comment ID

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    
    



   

    // submit process

function hdc_submit () {
    if (canSubmit) {
        let comment = {
            comment: hdcComment.value.trim(),
            email: hdcEmail.value.trim(),
            name: hdcName.value.trim(),
            reaction: reaction 
        };
        console.log(comment);
        hdc_disabled_submit();
        // hdcComment.value = '';
    }
}





    
    
    



// validate Email Address

function hdc_validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


  // array to store the comments
  const comments_arr = [];

  // to generate html list based on comments array
  const display_comments = () => {
  let list = '<ul class="cmm-ul">';
      comments_arr.forEach(comment => {
      list += `<li class="cmm-li hdComment" id="hdComment_1">${comment}</li>`;
  })
      list += '</ul>';
      parentElement.innerHTML = list;

      console.log(document.querySelector('.cmm-ul'));
      console.log(document.querySelector('.cmm-li'));
  };

  hdcSubmit.onclick = function(event){
  event.preventDefault();

  
  console.log(makeid(5));
  console.log(hdcComment.value);

  let content = `<div class="hdc_comment"  id=${makeid(5)}>
  <p class="hdcCommentValue">${hdcComment.value}</p>
</div>

<div class="hdc_data">

  <div class="hdc_data_date_author">

      <span class="hdc_data_author">- ${hdcName.value}</span><br>
      <p>
          ${realDate}
      </p>
  </div>

  <div class="hdc-delete">
            <i class="ri-delete-bin-3-line" data-product-id=${makeid(5)}></i>
        </div>

  <div class="hdc-like">

        

      <div class="hdc_vote_options">
      <span><i class="ri-heart-2-line hdc_upvote" data-id=${makeid(5)}></i></span>
      <span><i class="ri-heart-2-fill hdc_downvote" data-id=${makeid(5)}></i></span>
      </div>
      <span class="hdc_vote_${makeid(5)}">0</span>
  </div>
</div>`;
  if(content.length > 0){ // if there is content
    // add the comment to the array
    comments_arr.push(content);
    // re-genrate the comment html list
    display_comments();
    // reset the textArea content
    console.log(comments_arr); 
    hdcComment.value = '';
  }
  };

 
  


document.addEventListener('click', function(e){
    if(e.target && e.target.className == 'ri-delete-bin-3-line'){

        var chatIndex = comments_arr.indexOf('');//get  "car" index
        //remove car from the colors array
        comments_arr.pop(chatIndex);
        
        console.log(comments_arr.splice(chatIndex, 1));
    {

    display_comments();
        }
    };
});

    






  function hdc_set_event_listeners() {
    hdcSubmit.addEventListener('click', hdc_submit);
    hdcComment.addEventListener('keyup', hdc_can_submit);
    hdcName.addEventListener('keyup', hdc_can_submit);
    hdcEmail.addEventListener('keyup', hdc_can_submit);
    for (let i = 0; i < hdcReactions.length; i++) {
        hdcReactions[i].addEventListener('click', hdc_select_reaction);
    }

    for (let i = 0; i < hdcUpVote.length; i++) {
        hdcUpVote[i].addEventListener('click', function () {
            hdc_vote(this, true);
            hdcUpVote[i].style.display = 'none';
            hdcDownVote[i].style.display = 'block';
        });
        hdcDownVote[i].addEventListener('click', function () {
            hdc_vote(this, false);
            console.log(hdc_vote);
            hdcUpVote[i].style.display = 'block';
            hdcDownVote[i].style.display = 'none';
        });
    }
}
hdc_set_event_listeners();
  
