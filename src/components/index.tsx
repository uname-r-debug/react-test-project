import { Card, CardContent, CardHeader } from "./ui/card";
import { IoHomeOutline } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa";
import { Link } from "react-router";
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { Input } from "./ui/input";
import Pad from "./anchor/padx";
import { useEffect, useState } from "react";
import Split from "./layouts/split";
import { IoTimerSharp } from "react-icons/io5";
import CenterXY from "./anchor/Center";
import InfoCard from "./info-card";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import DropDown from "./ui/dropdown";
import { FaAngleDown } from "react-icons/fa";
type ResponseStatus = {
  response: {
    status: number;
    image: string;
    stats: [
      {
        base_stat: number;
        stat: { name: string };
      },
    ];
  };
};
export default function Index(): React.JSX.Element {
  const http: AxiosInstance = axios.create();
  const [status, setStatus] = useState<ResponseStatus>({
    response: {
      status: -1,
      image: "",
      stats: [
        {
          base_stat: 0,
          stat: {
            name: "",
          },
        },
      ],
    },
  });
  const [name, setName] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [source, setSrc] = useState<string>("");
  const [display, setDisplay] = useState<Array<React.ReactNode>>([undefined]);
  useEffect(() => {
    const { response } = status;
    if (response.status == 200) {
      setSrc(response.image);
      const stats = new Array<React.ReactNode>(response.stats.length);
      for (let i: number = 0; i < response.stats.length; ++i) {
        const stat = response.stats[i];
        stats.push(
          <AccordionItem
            value={`item-${i + 1}`}
            key={"k-" + i.toString()}
            className="flex flex-col"
          >
            <AccordionTrigger className="w-[100%] flex justify-between items-center border-b permanent-marker-regular">
              {stat.stat.name} <FaAngleDown className="animate-bounce" />
            </AccordionTrigger>
            <AccordionContent>{stat.base_stat}</AccordionContent>
          </AccordionItem>,
        );
      }
      setDisplay(stats);
    } else setSrc("");
  }, [status]);
  return (
    <Pad classList="px-10 py-5 min-h-[inherit] flex flex-col gap-10">
      <Card>
        <CardContent>
          <CardHeader className="flex justify-between items-center">
            <Link to="/">
              <IoHomeOutline className="hover:cursor-pointer" />
            </Link>
            <div className="flex w-[80%] items-center gap-2">
              <Input
                onChange={(e) => setName(e.target.value.toLocaleLowerCase())}
                className="permanent-marker-regular"
              />
              <FaSearchengin
                onClick={async () => {
                  try {
                    const r: AxiosResponse<{
                      sprites: {
                        front_default: string;
                      };
                      stats: [
                        {
                          base_stat: number;
                          stat: {
                            name: string;
                          };
                        },
                      ];
                    }> = await http.get(
                      `https://pokeapi.co/api/v2/pokemon/${name}/`,
                      {
                        responseType: "json",
                        headers: {},
                      },
                    );
                    setStatus({
                      response: {
                        status: r.status,
                        image: r.data.sprites.front_default,
                        stats: r.data.stats,
                      },
                    });
                    setPlaceholder(`A wild ${name} has appeared!`);
                  } catch (e) {
                    (() => e)();
                    setStatus({
                      response: {
                        status: -1,
                        image: "",
                        stats: [
                          {
                            base_stat: 0,
                            stat: {
                              name: "",
                            },
                          },
                        ],
                      },
                    });
                    if (placeholder) setPlaceholder("");
                  }
                }}
              />
            </div>
          </CardHeader>
        </CardContent>
      </Card>
      <Split>
        {CenterXY({
          element: source.length ? (
            <img src={source} className="w-[500px] h-[500px] animate-bounce" />
          ) : (
            <IoTimerSharp className="animate-spin" />
          ),
          y: "",
        })}
        <div className="border-2 border"></div>
        <InfoCard>
          <div className="permanent-marker-regular animate-bounce">
            {placeholder}
          </div>
          <div className="flex flex-col gap-4">
            <DropDown>{display}</DropDown>
          </div>
        </InfoCard>
      </Split>
    </Pad>
  );
}
