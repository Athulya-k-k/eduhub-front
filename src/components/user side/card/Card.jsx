import python from "../../../images/python.jpg";
import react from "../../../images/react.jpg";
import java from "../../../images/java.jpg";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
  
  export default function Example() {
    return (
      <div className="w-full h-full mt-10 bg-blue-gray-500">
        <p className=" text-3xl">TOP COURSES </p>
      <div className="flex  items-center mt-11 justify-center">
       
      <Card className="mt-6 w-96  ">
        <CardHeader color="blue-gray" className="relative h-56 ">
          <img src={python} alt="img-blur-shadow" layout="fill" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
           PYTHON
          </Typography>
          <Typography>
          ₹ 499
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Read More</Button>
        </CardFooter>
      </Card>
      <Card className="mt-6 w-96 ml-14">
        <CardHeader color="blue-gray" className="relative h-56">
          <img src={react} alt="img-blur-shadow" layout="fill" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
          REACT.JS
          </Typography>
          <Typography>
          ₹ 499
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Read More</Button>
        </CardFooter>
      </Card>
      <Card className="mt-6 w-96 ml-14">
        <CardHeader color="blue-gray" className="relative h-56">
          <img src={java} alt="img-blur-shadow" layout="fill" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
           JAVASCRIPT
          </Typography>
          <Typography>
            ₹ 499
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Read More</Button>
        </CardFooter>
      </Card>
      </div>
      </div>
    );
  }