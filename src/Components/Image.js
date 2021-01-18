import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

const ImageBox = (props) => (
  <Col className="mb-2 mr-2" w="20" xs={2} md={4} lg={5}>      
    <Row>
      <a href={props.Url} target="_blank" rel="noreferrer">
        <Image fluid src={props.Image} alt="Not loading..."></Image>
      </a>
    </Row>
    <Row>{props.Name}</Row>
    <Row>{props.Function === "search" ? (
      <Button id={props.Id} onClick={props.Add}>
        Add
      </Button> ) : (
      <Button variant="warning" id={props.Id} onClick={props.Remove}>
        Remove
      </Button>
    )}
    </Row>
  </Col>
);

export default ImageBox;
