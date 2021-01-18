import React, { useEffect, useState } from "react";
import ImageBox from "./Components/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  var request = new XMLHttpRequest();
  request.withCredentials = true;
  const [results, setResults] = useState([]);
  const [collection, setCollection] = useState([]);
  var collectionIds = [];
  var images = [];

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      images = JSON.parse(this.responseText);
      console.log(images);
      setResults([]);
      console.log(images.value);

      for (var index in images.value) {
        var image = images.value[index];

        setResults((oldResults) => [
          ...oldResults,
          <ImageBox
            Name={image.name}
            Id={image.imageId}
            Image={image.contentUrl}
            Url={image.hostPageDisplayUrl}
            Function="search"
            Add={add}
            Remove={remove}
          />
        ]);

        if (collectionIds.includes(image.imageId)) {
          document.getElementById(image.imageId).disabled = "true";
        }
      }
    }
  };

  useEffect(() => {
    const handleEnter = (event) => {
      if (event.key === "Enter" && event.target.nodeName === "INPUT") {
        var string =
          "https://bing-image-search1.p.rapidapi.com/images/search?q=" +
          document.getElementById("searchName").value +
          "&imageType=" +
          document.querySelector('input[name="type"]:checked').value;
        request.open("GET", string);
        request.setRequestHeader(
          "x-rapidapi-key",
          "98f010221dmsh0cfbf7835e80775p143c34jsn618d0cf263c8"
        );
        request.setRequestHeader(
          "x-rapidapi-host",
          "bing-image-search1.p.rapidapi.com"
        );

        request.send();
      }
    };

    document.addEventListener("keydown", handleEnter);

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  });

  const add = (event) => {
    event.target.disabled = "true";

    var image = images.value.filter((m) => {
      return m.imageId === event.target.id;
    });

    var imageObject = (
      <ImageBox
        Name={image[0].name}
        Id={image[0].imageId}
        Image={image[0].contentUrl}
        Url={image[0].hostPageDisplayUrl}
        Function="nomination"
        Add={add}
        Remove={remove}
      />
    );

    collectionIds.push(event.target.id);

    setCollection((oldCollection) => [...oldCollection, imageObject]);
  };

  const remove = (event) => {
    document.getElementById(event.target.id).disabled = false;

    var index = collectionIds.indexOf(event.target.id);

    if (collectionIds.length > 1) {
      setCollection((oldCollection) =>
        oldCollection
          .slice(0, index)
          .concat(oldCollection.slice(index + 1, oldCollection.length))
      );
    } else {
      setCollection([]);
    }

    collectionIds.splice(index, 1);
  };

  return (
    <Container>
      <Row className="justify-content-md-center" w="2">
        <img src="https://i.ibb.co/N1Tt4Vy/logo.png" alt="logo"></img>
      </Row>
      <Row>
        <p>Search for images and add them to your collection</p>
      </Row>
      <Row>
        <form>
          <input className="mr-2" d="searchName" placeholder="Search" />
          <input
            className="mr-1"
            type="radio"
            id="All"
            name="type"
            value="All"
            checked
          />
          <label className="mr-2" for="male">
            All
          </label>
          <input
            className="mr-1"
            type="radio"
            id="Clipart"
            name="type"
            value="Clipart"
          />
          <label className="mr-2" for="female">
            Clip art
          </label>
          <input
            className="mr-1"
            type="radio"
            id="Line"
            name="type"
            value="Line"
          />
          <label className="mr-2" for="other">
            Line art
          </label>
          <input
            className="mr-1"
            type="radio"
            id="Photo"
            name="type"
            value="Photo"
          />
          <label className="mr-2" for="other">
            Photo
          </label>
          <input
            className="mr-1"
            type="radio"
            id="AnimatedGif"
            name="type"
            value="AnimatedGif"
          />
          <label className="mr-4" for="other">
            GIF
          </label>
          {/* Not functional currently, but would implement by storing username, password and user's collection array in MongoDB */}
          <input type="textField" placeHolder="username" />
          <input type="password" placeHolder="password" />
          <button>Save collection</button>
          <button>Load collection</button>
        </form>
      </Row>
      <Row>
        <Col>
          <h2>Results</h2>
          <Row id="resultsDiv">{results}</Row>
        </Col>
        <Col>
          <h2>Collection</h2>
          <div>{collection}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
