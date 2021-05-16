import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Video } from "../Videos/video";
import * as videoService from "../Videos/VideoService";


const DropdownList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await videoService.getVideos();
    setVideos(res.data);
  };

  useEffect(() => {
    loadVideos();
    console.log("works");
  }, []);

  return (
    <Dropdown>
      <div>
        <Dropdown.Toggle className="dropdown-button">
          Seleccione
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          {videos.map((video) => {
            return <Dropdown.Item > {video.title} </Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </div>
    </Dropdown>
  );
};

export default DropdownList;
