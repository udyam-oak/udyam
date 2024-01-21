import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeatMap from "@uiw/react-heat-map";
import { useState } from "react";
import { Avatar, FloorReflection } from "@readyplayerme/visage";
import {
  AvatarCreatorConfig,
  AvatarCreator,
  AvatarExportedEvent,
} from "@readyplayerme/react-avatar-creator";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import streak from "../assets/streak.png";
import bb from "../assets/bb.png";

const value = [
  { date: "2023/01/11", count: 2 },
  { date: "2023/01/12", count: 4 },
  { date: "2023/01/13", count: 10 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2023/02/${idx + 10}`,
    count: idx,
    content: "",
  })),
  { date: "2023/04/11", count: 2 },
  { date: "2023/05/01", count: 5 },
  { date: "2023/05/02", count: 5 },
  { date: "2023/05/04", count: 11 },
];

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: true,
  language: "en",
};

const Profile = () => {
  const { id } = useParams();
  const [avatar, setAvatar] = useState("");
  const [points, setPoints] = useState(0);
  const [avatarCreator, setAvatarCreator] = useState(false);
  const [user, setUser] = useLocalStorage("username", "");
  const onExport = (e: AvatarExportedEvent) => {
    setAvatar(e.data.url);
    setAvatarCreator(false);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/getAvatar", {
        params: {
          username: id,
        },
      })
      .then((res) => {
        setAvatar(res.data.avatar_url);
      });
    axios
      .get("http://127.0.0.1:5000/getPoints", {
        params: {
          name: user,
        },
      })
      .then((res) => {
        setPoints(res.data.points);
      });
  }, []);
  useEffect(() => {
    if (id == user && avatar != "") {
      axios.get("http://127.0.0.1:5000/setAvatar", {
        params: {
          avatar_url: avatar,
          username: user,
        },
      });
    }
  }, [avatar]);
  return (
    <>
      <div className="flex gap-10 w-screen h-screen justify-center mt-10">
        <div>
          <div className="w-[500px] h-[500px] bg-[#EBEBEB] flex justify-center items-center">
            {avatar && (
              <Avatar
                animationSrc="https://readyplayerme.github.io/visage/male-idle.glb"
                backLightColor="#FFB878"
                backLightIntensity={2.2}
                background={{
                  color: "rgb(9,20,26)",
                }}
                bloom={{
                  intensity: 0.1,
                  kernelSize: 1,
                  luminanceSmoothing: 1,
                  luminanceThreshold: 1,
                  materialIntensity: 3.3,
                  mipmapBlur: true,
                }}
                blur={[300, 200]}
                cameraInitialDistance={3.2}
                cameraTarget={1.55}
                color="rgb(9,20,26)"
                depthScale={1.2}
                depthToBlurRatioBias={1}
                distortion={0}
                effects={{
                  ambientOcclusion: true,
                }}
                environment="warehouse"
                fillLightColor="#6794FF"
                fillLightIntensity={0.8}
                fov={50}
                keyLightColor="#FFFFFF"
                keyLightIntensity={1.2}
                maxDepthThreshold={1.4}
                metalness={0.5}
                minDepthThreshold={0.4}
                mirror={1}
                mixBlur={0.8}
                mixContrast={1}
                mixStrength={80}
                modelSrc={avatar}
                onLoaded={function noRefCheck() {}}
                onLoading={function noRefCheck() {}}
                reflectorOffset={0}
                resolution={512}
                roughness={1}
                scale={1}
                style={{}}
              >
                <FloorReflection
                  animationSrc="https://readyplayerme.github.io/visage/male-idle.glb"
                  backLightColor="#FFB878"
                  backLightIntensity={2.2}
                  background={{
                    color: "rgb(9,20,26)",
                  }}
                  bloom={{
                    intensity: 0.1,
                    kernelSize: 1,
                    luminanceSmoothing: 1,
                    luminanceThreshold: 1,
                    materialIntensity: 3.3,
                    mipmapBlur: true,
                  }}
                  blur={[300, 200]}
                  cameraInitialDistance={3.2}
                  cameraTarget={1.55}
                  color="rgb(9,20,26)"
                  depthScale={1.2}
                  depthToBlurRatioBias={1}
                  distortion={0}
                  environment="warehouse"
                  fillLightColor="#6794FF"
                  fillLightIntensity={0.8}
                  fov={50}
                  keyLightColor="#FFFFFF"
                  keyLightIntensity={1.2}
                  maxDepthThreshold={1.4}
                  metalness={0.5}
                  minDepthThreshold={0.4}
                  mirror={1}
                  mixBlur={0.8}
                  mixContrast={1}
                  mixStrength={80}
                  modelSrc={avatar}
                  onLoaded={function noRefCheck() {}}
                  onLoading={function noRefCheck() {}}
                  reflectorOffset={0}
                  resolution={512}
                  roughness={1}
                  scale={1}
                  style={{}}
                />
              </Avatar>
            )}
            {!avatar && id == user && (
              <button
                onClick={() => setAvatarCreator(true)}
                className="text-center px-10 py-5 bg-[#E0BBE6]"
              >
                Create Avatar
              </button>
            )}
            {avatarCreator && (
              <AvatarCreator
                subdomain="udyam"
                config={config}
                style={{
                  position: "absolute",
                  width: "100vw",
                  height: "100vh",
                  border: "none",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                }}
                onAvatarExported={onExport}
              />
            )}
          </div>
          <div className="text-center font text-2xl font-bold">{id}</div>
          {!avatarCreator && (
            <div className="flex justify-around">
              {!avatarCreator && (
                <div>
                  Points
                  <div className="bg-[#EBEBEB] w-[150px] h-[50px] text-center flex items-center justify-center rounded drop-shadow-sm text-4xl">
                    {points}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <div className="font-medium pb-10 flex flex-col gap-4 text-xl">
            Challenges yearly review
            <HeatMap
              value={value}
              weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
              startDate={new Date("2023/01/01")}
              style={{ width: "500px" }}
              rectSize={15}
              rectProps={{
                rx: 2,
              }}
              panelColors={{
                6: "#7D538D",
                4: "#BA68C8",
                2: "#E0BBE6",
              }}
            />
          </div>
          <div>
            <h1 className="text-xl font-medium">Achievements</h1>
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-2">
                <img src={streak} />
                Participated in a camping workshop
              </div>
              <div className="flex items-center">
                <img src={bb} />
                Won in the sfa basketball tournament
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
