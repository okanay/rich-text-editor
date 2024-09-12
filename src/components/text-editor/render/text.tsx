import { NodeHandler } from "@troop.com/tiptap-react-render";
import React from "react";
import { TextMark } from "./marks";

export const text: NodeHandler = (props) => <TextMark node={props.node} />;
