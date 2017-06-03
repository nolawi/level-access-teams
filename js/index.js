{

    let tasks = [];
    let errors = [];
    let DOM = document.querySelector.bind(document);
    DOM('body').addEventListener('submit', add);
    DOM('body').addEventListener('click', remove);

    function add(ev) {
      //console.log(tasks);
        ev.preventDefault();
        if (ev.target.tname.value === '' ) {
            error('cant save empty team member');
            return;
        }
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

    function remove(ev) {
        if (ev.target.classList.contains('done')) {
            tasks[ev.target.dataset.id].done = tasks[ev.target.dataset.id].done ? false: true;
        } else if (ev.target.classList.contains('delete')) {
            tasks.splice(ev.target.dataset.id, 1);
        }
      render();
    }

    function error(text) {
        DOM('.errors').innerHTML = `<div class="alert alert-danger">${text}</div>`;
        setTimeout(() => {
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
        return `<li  class="list-group-item">
        ${tname}
<span class="badge badge-primary">${pID}</span><span class="badge badge-danger">${descr}</span>
            <ul><li class="small">${descr}</li></ul>

      <button type="button" class="close pull-right" aria-label="Close"><span class="delete" aria-hidden="true" data-id="${id}">&times;</span></button>

      </li>`;
    }

}