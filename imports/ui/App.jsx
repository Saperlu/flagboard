import React, {useEffect, useState, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Flag } from "./Flag.jsx";
import { FlagsCollection } from '../api/FlagsCollection.js';

export const App = () => {
  const lastFlagsFetch = useRef(new Date())
  const flags = useTracker(() =>
    FlagsCollection.find({}, {
      sort: { createdAt: 1 },
    }).fetch()
  );

  useEffect(() => {
    console.debug(`effect : ${flags}`)
    const now = new Date();
    if(lastFlagsFetch - now < 10000) {
      console.debug("ignored hook")
      lastFlagsFetch = now
      return;
    }
    if (flags.length == 1) {
      console.log("FIRST BLOOD")
      console.debug(flags)
    } else if (flags.length > 1) {
      console.log("new flag");
      console.debug(flags)
    }
  }, [flags])

  

  return (
    <div className="main">

      <h1>Les flags :</h1>
      <ul>
        {flags.map((f) => (
          <Flag key={f._id} flag={f}></Flag>
        ))}
      </ul>
    </div>
  );
};
