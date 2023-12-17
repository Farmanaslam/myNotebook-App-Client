import React from "react";
const About = () => {
  return (
    <>
      <div className="about-head d-flex justify-content-center fs-2 mt-4 mb-4 mx-4">
        myNotebook -create and design your notes easily
      </div>
      <div className="p-4 row">
        <div className="about-para col-md-6 mb-4">
          <p>
            myNotebook Website provides tools to add delete update your notes. A
            note a day keeps the chaos away.
            <br></br>
            <br></br>
            Many note-taking applications force you to make lists, create pages
            and check off to-do lists. At myNotebook, we don't believe in
            forcing you to do anything. Your ideas are yours: Just get them out!
            <br></br>
            <br></br>
            Your notes are stored on your database and use your mind's built-in
            spatial memory for quick access and recall. You'll never lose your
            notes again because, just like driving around your hometown, "you've
            been there before.
            <br></br>
            <br></br>
            Hold meetings across the globe and create a shared space for
            participants to collaborate.
            <br></br>
            <br></br>
            -Organize your thoughts visually and quickly add notes with one
            click. Easily find them again in seconds.
          </p>
        </div>
        <div className="col-md-6">
          <img
          alt="about-img"
            className="mt-4  about-img"
            src="https://www.zdnet.com/a/img/resize/22c8a5bdcd15b98181e868dd082821cd6e385d0a/2022/07/19/a4999757-d4d5-435e-afd8-499bdea766de/nebo.jpg?auto=webp&fit=crop&height=900&width=1200"
          />
        </div>
      </div>

      <div className="p-4 row">
        <div className="col-md-6">
          <img
           alt="about-img2"
            className="mt-4  about-img"
            src="https://collegeinfogeek.com/wp-content/uploads/2020/01/best-note-taking-apps-for-ipad-featured.jpg"
          />
        </div>
        <div className="about-para col-md-6 mb-4">
          <p>
            To Start using myNotebook just login/signup with your email Id and
            passward.
            <br></br>
            <br></br>
            All Your notes will be displayed on the home screen. You can easily
            manage all your notes. Add Update or delete your notes instantly with
            myNotebook.
            <br></br>
            <br></br>
            It may not seem like much, but in a fast-paced work environment, the
            smallest improvements are some of the biggest gains. -Fill your
            notepad, fuel your knowledge.
            <br></br>
            <br></br>
            -Write it down now, remember it always.
            <br></br>
            <br></br>
            -A simple note can prevent a mistake.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
