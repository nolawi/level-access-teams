// by nolawi petros

{

    let tasks = [];
    //error handling
    //
    let errors = [];
    //listen to submit and send value to localhost
    let DOM = document.querySelector.bind(document);
    DOM('body').addEventListener('submit', add);
    DOM('body').addEventListener('click', remove);

    function add(ev) {
      //console.log(tasks);
        ev.preventDefault();
        if (ev.target.tname.value === '' ) {
            //checks if there is a value 
            error('cant save empty team member');
            return;
        }
        //had to look this up.. left some dummy but name is passing 
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift?v=control
        tasks.unshift({
            text: ev.target.tname.value,
            ptext: 423,
            itext: 66,
            dtext: "This is Dummy Description",
            done: false,
         
        });
        render();
        ev.target.tname.value = '';
    
    }
    // this is just to delete one item 
    function remove(ev) {
        if (ev.target.classList.contains('done')) {
            //data attribute for this. instead of index or this. This will scale better..
            tasks[ev.target.dataset.id].done = tasks[ev.target.dataset.id].done ? false: true;
        } else if (ev.target.classList.contains('delete')) {
            //remove it here
            tasks.splice(ev.target.dataset.id, 1);
        }
      render();
    }
    // remember the abstraction.. this way each field will pass in its own text
    function error(text) {
        // Just learning the stringfy method in ES6
        DOM('.errors').innerHTML = `<div class="alert alert-danger">${text}</div>`;
        setTimeout(() => {
            //wish I had jquery for this .. had to look this up too
            DOM('.errors div').style.display = 'none';
        }, 3000);
    }

    function render() {
        DOM('#team-list').innerHTML = '';
        tasks.map((t, i) => {
            DOM('#team-list').innerHTML += taskTpl(i, t.text, t.ptext,t.done);
        }).reverse();
    }

    function taskTpl(id, text, date, done, ptext, itext, dtext) {
      let tname = done ? '<s>' + text + '</s>' : text;
      let pID =  423;
      let iID =  6957;
      let descr =  "Dummy Description";
        // I return the whole thing in html. since i dont have state i am just placing default value. 
        // 
        return `<li  class="list-group-item">
        ${tname}
<span class="badge badge-primary">${pID}</span><span class="badge badge-danger">${iID}</span>
            <ul><li class="small">${descr}</li></ul>

      <button type="button" class="close pull-right" aria-label="Close"><span class="delete" aria-hidden="true" data-id="${id}">&times;</span></button>

      </li>`;
    }

}