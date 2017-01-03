var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

$(document).ready(function() {
    var timer;

    //main menu animations
    $('.linkBox').hover(function() {
      $(this).find('.bar').css('width','100%');
      $(this).find('.linkHolder').css('left','43%');
      timer = setTimeout(function() {
      $(this).find('.bar:nth-child(1)').css('margin-bottom','10px');
      $(this).find('.bar:nth-child(3)').css('margin-top','10px');
      $(this).find('a').css('border-top','1px solid grey').css('border-bottom', '1px solid grey');
    }.bind(this), 500);
  }, function() {
      clearTimeout(timer);
      $(this).find('.bar').css('width','').css('margin-top','').css('margin-bottom','');
      $(this).find('.linkHolder').css('left','');
      $(this).find('a').css('border-top','').css('border-bottom', '');
  });

  $('#aboutBox').on('click', function() {
    $('html, body').animate({
        scrollTop: $('#about').offset().top
    },500);
  });
  $('#projectsBox').on('click', function() {
    $('html,body').animate({
      scrollTop: $('#projects').offset().top
    },500);
  });
  $('#contactBox').on('click', function() {
    document.getElementById('contact').scrollIntoView();
  });
  

  //resize section sizes if applicable
    if ($(window).height() > 750) {
    $('#intro,#about,#projects').css('height',$(window).height());
  }
  

  //left and right project pages' hover effect
  $(document).on('mouseenter','#leftPage', function() {
    $('#leftPage').stop();
    if ($('#leftPage').css('margin-left') != "-350px") {
      $('#leftPage').animate({marginLeft:'-350px'},500);
    }
    else {
      $('#leftPage').animate({marginLeft:'-=50px'},500);
    }

  });
  $(document).on('mouseleave','#leftPage', function() {
    $('#leftPage').stop();
    $('#leftPage').animate({marginLeft:'-350px'},500);

  });
  $(document).on('mouseenter','#rightPage', function() {
    $('#rightPage').stop();
    if ($('#rightPage').css('margin-left') != '-50px') {
      $('#rightPage').animate({marginLeft:'-50px'},500);
    }
    else {
      $('#rightPage').animate({marginLeft:'+=50px'},500);
    }
  });
  $(document).on('mouseleave','#rightPage', function() {
    $('#rightPage').stop();
    $('#rightPage').animate({marginLeft:'-50px'},500);
  });

});


//projects React App
class App extends React.Component { //project scroller
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.state = { projectArr: [
      { title:"BookBazaar", description:"Application used for collecting and trading books with fellow Bazaar users. Trade requests are tracked in the Bazaar command center, and trade history can be accessed via the profile.", tech:["Node","Express","Jade","React","Webpack","Mongo"], link:"https://thebookbazaar.herokuapp.com/" },
      { title:"Stockseeker", description: "Application created for viewing/tracking stocks. Tracked stocks are dynamically updated across all clients via websockets. Stock data extracted via Quandl's finance API.", tech: ["Node","React", "D3", "Sockets", "Mongo"], link:"https://stockseeker.herokuapp.com/" },
      { title:"LaughOrFrown", description:"Laugh sharing site for both tasteful and crude jokes alike. Registered users can rate others' uploads via LaughOrFrown's custom scale.", tech:["C# MVC Core, EF/SQL"], link:"http://laughorfrown.azurewebsites.net/"},
      { title:"BarHopShop", description:"Simple app for coordinating nightlife attendance based on geographical location.", tech:["Node","Express","Passport","Mongo","React"], link:"https://barhopshop.herokuapp.com/" },
      { title:"MusicalSight", description:"Image sharing site focusing on all things music. Registered users may like images that they find appealing.", tech:["Node","Express","Angular 2","Mongo","Passport"], link:"https://musicalsight.herokuapp.com/" },
      { title:"PostuhPoll", description:"Application used to create custom polls. PostuhPoll users may vote on polls created by other users.", tech:["Node","Express","React","D3","Mongo","Passport"], link:"https://postuhpoll.herokuapp.com/" }
    ], currentPage: 1, prevPage: 0, nextPage: 2 }; //page indexes
  }

  changePage(thePage) { //change pages
    var len = this.state.projectArr.length;
    if (thePage == "leftPage") {
      if (this.state.currentPage == 0) {
        this.setState({ currentPage: len-1, prevPage: len-2, nextPage: 0 });
      }
      else if (this.state.currentPage == 1){
        this.setState({ currentPage: 0, prevPage: len-1, nextPage: 1 });
      }
      else {
        this.setState({ currentPage: this.state.currentPage-1, prevPage: this.state.currentPage-2, nextPage: this.state.currentPage });
      }
    }
    else if (thePage == "rightPage") {
      if (this.state.currentPage == len-1) {
        this.setState({ currentPage: 0, prevPage: len-1, nextPage: 1 });
      }
      else if (this.state.currentPage == len-2) {
        this.setState({ currentPage: len-1, prevPage: len-2, nextPage: 0 });
      }
      else {
        this.setState({ currentPage: this.state.currentPage+1, prevPage: this.state.currentPage, nextPage: this.state.currentPage+2 });
      }
    }
  }

  render() { //render the pages each with their own transitions
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="leftAnim"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
        <LeftPage title={this.state.projectArr[this.state.prevPage].title} thePage="leftPage" key={this.state.projectArr[this.state.prevPage].title+"left"} changePage={this.changePage}/>
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName="mainAnim"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
        <MainPage title={this.state.projectArr[this.state.currentPage].title} description={this.state.projectArr[this.state.currentPage].description} tech={this.state.projectArr[this.state.currentPage].tech} link={this.state.projectArr[this.state.currentPage].link} thePage="mainPage" key={this.state.projectArr[this.state.currentPage].title+"main"} />
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName="rightAnim"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
        <RightPage title={this.state.projectArr[this.state.nextPage].title} thePage="rightPage" key={this.state.projectArr[this.state.nextPage].title+"right"} changePage={this.changePage} />
        </ReactCSSTransitionGroup>
      </div>

    );
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  navTo() {
    window.location.href=this.props.link;
  }

  render() {
    var techString = this.props.tech.join(", ");

    return (
      <div id="mainPage">
        <div className="headerHolder">
          <h3>{this.props.title}</h3>
        </div>
        <div className="descriptionHolder">
          <h5>Description: </h5>
          <p>{this.props.description}</p>
          <hr/>
          <h5>Notable tech used:</h5>
          <p>{techString}</p>

          <div className="navi" onClick={this.navTo.bind(this)}>
            <div className="core"></div>
            <div className="wings"></div>
          </div>
          <p className="cautionText">Caution: Navigational core unstable. Use at your own risk.</p>
        </div>


      </div>

    );
  }
}

class LeftPage extends React.Component {
  constructor(props) {
    super(props);
  }

  changePage() {
    this.props.changePage(this.props.thePage);
  }

  render() {
    return <div id="leftPage" onClick={this.changePage.bind(this)} >
        <div className="sideTitle" id="leftTitle">{this.props.title}</div>
      </div>
  }
}

class RightPage extends React.Component {
  constructor(props) {
    super(props);
  }

  changePage() {
    this.props.changePage(this.props.thePage);
  }

  render() {
    return <div id="rightPage" onClick={this.changePage.bind(this)}>
        <div className="sideTitle" id="rightTitle">{this.props.title}</div>
      </div>;
  }
}

ReactDOM.render(<App />,document.getElementById('App'));
