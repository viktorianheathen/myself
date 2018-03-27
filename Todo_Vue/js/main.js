var app = new Vue({
    el: '#app_todo',
    data: {
      input: '',
      editVal: '',
      todo_title: 'TODO.JS by Viktorian',
      stor: JSON.parse(localStorage.getItem('DataTodos')),
      showClock: '',
      clockIsDay: true,
      clockIsNight: false
    },
    methods: {

        /*--------------------------------------> Создать задачу*/
        saveToDo: function(){
            var n_todo = {
                
                name: this.input,
                status: false,
                hidden: false,
                editmode: true

            }
            if(this.stor === null)
                {
                    var el = [];
                    rEl = JSON.stringify(el);
                    localStorage.setItem('DataTodos', rEl);
                    this.stor = JSON.parse(localStorage.getItem('DataTodos'));
                }
            this.stor.push(n_todo);
            var sStor = JSON.stringify(this.stor);
            localStorage.setItem('DataTodos', sStor);
            this.input = '';
        },
        /*--------------------------------------> ////////// Создать задачу*/

        /*--------------------------------------> Завершить задачу*/
        completeTask: function(i){                

            var el = this.stor[i];
            el.status = !el.status;
            var sStor = JSON.stringify(this.stor);
            localStorage.setItem('DataTodos', sStor);

        },
        /*--------------------------------------> ////////// Завершить задачу*/

        /*--------------------------------------> Удалить задачу*/
        deleteTask: function(i){                

            this.stor.splice(i,1);
            var sStor = JSON.stringify(this.stor);
            localStorage.setItem('DataTodos', sStor);

        },
        /*--------------------------------------> ////////// Удалить задачу*/

        /*--------------------------------------> Редактировать задачу*/
        editTask: function(i){

            var el = this.stor[i];
            el.hidden = !el.hidden;
            el.editmode = !el.editmode;
            var sStor = JSON.stringify(this.stor);
            localStorage.setItem('DataTodos', sStor);
            
        },

        saveEditTask: function(i){

            var el = this.stor[i];
            el.name = this.editVal;
            el.hidden = !el.hidden;
            el.editmode = !el.editmode;
            var sStor = JSON.stringify(this.stor);
            localStorage.setItem('DataTodos', sStor);
            this.editVal = '';
        },
        /*--------------------------------------> ////////// Редактировать задачу*/

        /*--------------------------------------> Скрыть часы*/
        closeCyfral: function(){

            this.showClock = !this.showClock;
            localStorage.setItem('CyfralClock', this.showClock);

        }
        /*--------------------------------------> ////////// Скрыть часы*/
    },
    created: function () {
        this.showClock = JSON.parse(localStorage.getItem('CyfralClock'));

        if(this.showClock == null)
            {
                localStorage.setItem('CyfralClock', true);
                this.showClock = JSON.parse(localStorage.getItem('CyfralClock'));
            }

            var date = new Date();
            var d_hours = date.getHours();

            this.clockIsDay = JSON.parse(localStorage.getItem('clockIsDay'));
            this.clockIsNight = JSON.parse(localStorage.getItem('clockIsNight'));
            if(this.clockIsDay == null)
                {
                    localStorage.setItem('clockIsDay', true);
                    this.clockIcon = JSON.parse(localStorage.getItem('clockIsDay'));
                }
            if(this.clockIsNight == null)
                {
                    localStorage.setItem('clockIsNight', true);
                    this.clockIcon = JSON.parse(localStorage.getItem('clockIsNight'));
                }
                
            if(d_hours >= 18)
                {
                    this.clockIsDay = false;
                    this.clockIsNight = true;
                    localStorage.setItem('clockIsDay', this.clockIsDay);
                    localStorage.setItem('clockIsNight', this.clockIsNight);
                }
            else
                {
                    this.clockIsDay = true;
                    this.clockIsNight = false;
                    localStorage.setItem('clockIsDay', this.clockIsDay);
                    localStorage.setItem('clockIsNight', this.clockIsNight);
                }
      }
  });

function todoWidgetClock()
{
    /* -------------- Clock --------------- */
    var date = new Date();
    var d_hours = date.getHours();
    var d_minutes = date.getMinutes();
    var d_seconds = date.getSeconds();

    /* -------------- Date --------------- */
    var d_month = date.getMonth();
    var d_day = date.getDate();
    var d_year = date.getFullYear();
    console.log(d_month);
    if(d_month == 12){ d_month = 'Январь' };
    if(d_month == 1){ d_month = 'Февраль' };
    if(d_month == 2){ d_month = 'Март' };
    if(d_month == 3){ d_month = 'Апрель' };
    if(d_month == 4){ d_month = 'Май' };
    if(d_month == 5){ d_month = 'Июнь' };
    if(d_month == 6){ d_month = 'Июль' };
    if(d_month == 7){ d_month = 'Август' };
    if(d_month == 8){ d_month = 'Сентябрь' };
    if(d_month == 9){ d_month = 'Октябрь' };
    if(d_month == 10){ d_month = 'Ноябрь' };
    if(d_month == 11){ d_month = 'Декабрь' };

    var fullDate = d_day + " " + d_month + " " + d_year;

    if(d_hours < 10){ d_hours = '0' + date.getHours(); }
    if(d_minutes < 10){ d_minutes = '0' + date.getMinutes(); }
    if(d_seconds < 10){ d_seconds = '0' + date.getSeconds(); }

    $('#clock_hours').html(d_hours);
    $('#clock_minuts').html(d_minutes);
    $('#clock_seconds').html(d_seconds);

    $('#clock_date').html(fullDate);
}
var startClock = setInterval(todoWidgetClock, 1000);
  
