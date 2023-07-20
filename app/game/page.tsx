'use client';

import { useState, useEffect } from "react";
import { ChangeEvent } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import wordsPairs from '../../data/wordsBank';

enum Role {
  White = 'W',
  Undercover = 'U',
  Civilian = 'C',
};

interface SettingNum {
  value: number;
  description: string;
};

interface SettingBool {
  value: boolean;
  description: string;
};

interface Settings {
  nU: SettingNum;
  nW: SettingNum;
  sR: SettingBool;
};

type SettingsKey = keyof Settings;

const initSettings: Settings = {
  nU: { value: 1, description: "# Undercovers" }, // Number of undercover
  nW: { value: 0, description: "# Mr Whites" }, // Number of whites
  sR: { value: false, description: "Know roles" }, // Show roles with words

};

interface Distribution {
  to: Role;
  value: number;
  condition: boolean;
  conditionString: string;
}

interface Event {
  distrib: Distribution[];
  description: string;
}

type Events = Record<string, Event>;

const initEvents: Events = {
  wWinEnd: { 
    distrib: [
      {to: Role.White, value: 10, condition: true, conditionString: 'alive'}, 
      {to: Role.Civilian, value: -3, condition: false, conditionString: 'all'}, // 'all' replaced by a condition that always returns true
    ], 
    description: "Mr White wins as last one standing" 
  },
  wKnowsCW: {
    distrib: [
      {to: Role.White, value: 6, condition: true, conditionString: 'alive'}, 
      {to: Role.Civilian, value: -3, condition: false, conditionString: 'all'}, 
    ],
    description: "Mr White finds the civil word"
  },
  wKnowsUW: {
    distrib: [
      {to: Role.White, value: 3, condition: true, conditionString: 'alive'}, 
      {to: Role.Undercover, value: -3, condition: false, conditionString: 'all'}, 
    ],
    description: "Mr White finds the undercover word"
  },
  wElim: {
    distrib: [
      {to: Role.White, value: -3, condition: true, conditionString: 'alive'}, 
      {to: Role.Civilian, value: 4, condition: true, conditionString: 'alive'}, 
    ],
    description: "Mr White eliminated and finding no word"
  },
  uWin: {
    distrib: [
      {to: Role.Undercover, value: 5, condition: true, conditionString: 'alive'}, 
      {to: Role.Civilian, value: -3, condition: false, conditionString: 'all'}, 
    ],
    description: "Undercovers win as last one standing"
  },
  cWin: {
    distrib: [
      {to: Role.Civilian, value: 3, condition: true, conditionString: 'alive'},
    ],
    description: "Civils win"
  },
  through: {
    distrib: [
      {to: Role.White, value: 4, condition: true, conditionString: 'alive'}, 
      {to: Role.Undercover, value: 1, condition: true, conditionString: 'alive'}, 
    ],
    description: "alive and through to the next round"
  },
  uElim: {
    distrib: [
      {to: Role.Civilian, value: 2, condition: true, conditionString: 'alive'}, 
    ],
    description: "Undercover eliminated"
  },
  cElim: {
    distrib: [
      {to: Role.Undercover, value: 3, condition: true, conditionString: 'alive'}, 
    ],
    description: "Civil eliminated"
  },
};

// Define the structure of the player
interface PlayerAtPts {
  name: string;
  role: Role;
  alive: boolean;
  nPts: number;
}

// Define the structure of the player
interface PlayerState {
  name: string;
  points: number;
  alive: boolean;
  role: Role; // Here's the modification
  seen: boolean;
}

// Define a type for the array of scenarios
type Scenario = ("wKnowsCW" | "wKnowsUW" | "wElim" | "wWinEnd" | "uElim" | "cElim" | "uWin" | "cWin" | "through")[];

interface gameType {
  elimP: boolean;
  gameN: number;
  roundN: number;
};

const initGame: gameType = {
  elimP: false,
  gameN: 1,
  roundN: 1,
};

const MIN_PLAYERS = 3;

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  const storedValue = localStorage.getItem(key);

  if (storedValue !== null) {
      return JSON.parse(storedValue);
  }

  return defaultValue;
};

const horizontalSizeClasses = "flex justify-between items-center gap-x-2 mx-4 sm:mx-2";
const horizontalEventSizeClasses = "flex flex-col justify-between items-center gap-2  mx-4 sm:mx-2";
const inputClasses = "w-48 pl-2 border-2 border-blue-500 focus:border-blue-700 focus:outline-none text-blue-500 hover:border-blue-700 font-bold py-2 rounded";

const roleNames: Record<Role, string> = {
  W: 'Mr White',
  C: 'civil',
  U: 'undercover'
};

export default function Game() {
  const [playerInput, setPlayerInput] = useState("");
  const [players, setPlayers] = useState<PlayerState[]>([]);
  const [settings, setSettings] = useState<Settings>(initSettings); // Initialize your settings state
  const [events, setEvents] = useState<Events>(initEvents); // Initialize your events state

  const [isPlaying, setIsPlaying] = useState(false); // Keep track of the current game state
  const [isPtsSettings, setIsPtsSettings] = useState(false); // Keep track of the current game state

  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    wFoundCWord: false,
    wFoundUWord: false,
    wPElim: "",
  });

  const [words, setWords] = useState<{ cW: string; uW: string }>({
    cW: "",
    uW: "",
  }); // Keep track of the current word

  const [game, setGame] = useState<gameType>(initGame);

  useEffect(() => {
    setIsPlaying(false);
    setIsPtsSettings(false);
    setPlayerInput("");
    setIsModalOpen({
      open: false,
      wFoundCWord: false,
      wFoundUWord: false,
      wPElim: "",
    })
    setWords({
      cW: "",
      uW: "",
    });

    setPlayers(getFromLocalStorage("players", []));
    setSettings(getFromLocalStorage("settings", initSettings));
    setEvents(getFromLocalStorage("events", initEvents));
    setGame(getFromLocalStorage("game", initGame));
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("settings", JSON.stringify(settings)); // Store settings in local storage
    localStorage.setItem("events", JSON.stringify(events)); // Store settings in local storage
    localStorage.setItem("game", JSON.stringify(game)); // Store settings in local storage

    console.log('players :', players);
    // console.log('settings :', settings);
    console.log('game :', game);
  }, [players, settings, events, game]); // Update local storage when players or settings change

  const handlePlay = () => {
    // Add your game condition checks here. If everything is alright, switch the state.
    if (pseudosCheck() && settingsCheck()){
      setIsPlaying(!isPlaying);

      handleAttribution();
    }
  };

  const getWords = () => {
    const index = Math.floor(Math.random() * wordsPairs.length);
    const pair = wordsPairs[index];

    return {cW: pair.c, uW: pair.u};
  };

  const handleAttribution = () => {
    // get batch of random roles
    const rdmRoles = batchRdmRoles();

    // attribute role to players and reset alive to true
    const newPlayers = players.map((player, index) => {
      return { ...player, role: rdmRoles[index], alive: true, seen: false };
    });

    // update players
    setPlayers(newPlayers);

    // get batch of random words
    const rdmWords = getWords();

    console.log('rdmWords :', rdmWords);

    // update words
    setWords(rdmWords);

    // update game
    setGame(prevGame => ({
      elimP: false, 
      gameN: prevGame.gameN + 1, // increment gameN
      roundN: 1, // reset roundN to 1
    }));

    // toast to warn the game has been shuffled
    toast("the game has been shuffled");
  };

  const handlePtsSettings = () => {
    setIsPtsSettings(!isPtsSettings);
  };

  const handlePlayerInput = (event: ChangeEvent<HTMLInputElement>) => {
      setPlayerInput(event.target.value);
  };
  
  const handleAddPlayer = () => {
    if (playerInput) {
      setPlayers([...players, { name: playerInput, points: 0, alive: true, seen: false, role: Role.Civilian }]);
      setPlayerInput("");
    }
  };
  
  const handleRemovePlayer = (playerToRemove: string) => {
    setPlayers(players.filter((player) => player.name !== playerToRemove));
  };

  // Handle change for settings
  const handleSettingsChange = (event: ChangeEvent<HTMLInputElement>, field: SettingsKey) => {
    let value: number | boolean = event.target.type === 'checkbox' ? event.target.checked : parseInt(event.target.value); // Parse input value to integer

    // Check if the value is a valid number, otherwise default to 0
    if (typeof value === "number" && isNaN(value)) {
      value = 0;
    }

    // Check if the value makes sense with the current number of players
    // Check if the value makes sense with the current number of players
    if ((field === 'nU' || field === 'nW') && typeof value === "number" && value > players.length) {
      if (field === 'nU')
          toast(`Number of undercovers cannot be greater than the total number of players.`);
      else
          toast(`Number of Mr White cannot be greater than the total number of players.`);
      value = players.length;
    }

    setSettings({...settings, [field]: { ...settings[field], value: value }});
  };

  // Handle change for events
const handleEventsChange = (event: React.ChangeEvent<HTMLInputElement>, eventKey: keyof Events, distribIndex: number) => {
  let value: number = parseInt(event.target.value); // Parse input value to integer

  // Check if the value is a valid number, otherwise default to 0
  if (isNaN(value)) {
    value = 0;
  }

  // Create a copy of the current events
  const newEvents = { ...initEvents };

  // Update the value of the specific distribution in the specific event
  newEvents[eventKey].distrib[distribIndex].value = value;

  // Update the state
  setEvents(newEvents);
};


  const handleEditPlayer = (index: number, newName: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = newName || ""; // default to empty string if newName is undefined or null

    setPlayers(newPlayers);
  };

  const handleShowWord = (selectedplayer: PlayerState) => {
    // update player.seen value to true
    const newPlayers = players.map(player => {
      if (player.name === selectedplayer.name) {
        return {
          ...player,
          seen: true,
        };
      }
      return player;
    });

    setPlayers(newPlayers);

    if (settings.sR.value) {
      if (selectedplayer.role === "C") {
        toast(`you are a civil your word is ${words.cW}`);
      } else if (selectedplayer.role === 'U'){
        toast(`you are an undercover, your word is ${words.uW}`);
      } else {
        toast("you are a Mr.White");
      }
    } else {
      if (selectedplayer.role === "C") {
        toast(`your word is ${words.cW}`);
      } else if (selectedplayer.role === 'U'){
        toast(`your word is ${words.uW}`);
      } else {
        toast("you are a Mr.White");
      }
    }
  };

  const handleElimination = (selectedplayer: PlayerState) => {
    console.log('handling elimination function')
    if (selectedplayer.role === "C" || selectedplayer.role === "U") {
      const scenario = getScenarioUC(selectedplayer);
      console.log('scenario :', scenario);

      let newPlayers = players;

      if (scenario.includes("uElim") || scenario.includes("cElim")) {
        newPlayers = newPlayers.map(player => {
          if (player.name === selectedplayer.name) {
            return {
              ...player,
              alive: false,
            };
          }
          return player;
        }
        );
      };

      handleFromScenario(scenario, selectedplayer, newPlayers);

    } else {
      openCloseModal(selectedplayer.name);
    }
  };

  const handleWElim = () => {
    console.log('handling WElim function')
    openCloseModal("");

    const selectedplayer = players.find(player => player.name === isModalOpen.wPElim);

    if (selectedplayer) {
      const scenario = getScenarioW(selectedplayer);
      console.log('scenario :', scenario);

      let newPlayers = players;

      if (scenario.includes("wElim")) {
        // update player.alive value to false
        newPlayers = newPlayers.map(player => {
          if (player.name === selectedplayer.name) {
            return {
              ...player,
              alive: false,
            };
          }
          return player;
        });
      };

      handleFromScenario(scenario, selectedplayer, newPlayers);
    } else {
      toast("something went wrong");
    }
  };
  
  const handleFromScenario = (scenario: Scenario, selectedplayer: PlayerState, newPlayers: PlayerState[]) => {
    console.log('handling from scenario function')
    // update points
    const pts = computePts(scenario, selectedplayer, newPlayers);
  
    newPlayers = newPlayers.map(player => {
      const concernedPlayerPts = pts.find(ptsPlayer => ptsPlayer.name === player.name);
      if (concernedPlayerPts) {
        return {
          ...player,
          points: player.points += concernedPlayerPts.nPts,
        };
      }
      return player;
    });

    isWin(scenario, newPlayers);
  };

  const isWin = (scenario: Scenario, newPlayers: PlayerState[]) => {
    console.log('isWin function');
    const winScenarios: Scenario = ["wKnowsCW", "wKnowsUW", "wWinEnd", "uWin", "cWin"];

    if (winScenarios.some(el => scenario.includes(el))){
      toast("End of Game");

      handleAttribution();
    } else {
      // if no win scenario, increment roundN
      setGame(prevGame => ({
        ...prevGame, 
        roundN: prevGame.roundN + 1, // increment roundN
      }));

      setPlayers(newPlayers);
    }
  };

  function addValueToPlayer(iPlayer: PlayerAtPts, value: number, playersCopy: PlayerAtPts[]) {
    const concernedPlayerCopy = playersCopy.find(player => player.name === iPlayer.name);
    if (concernedPlayerCopy) {
      concernedPlayerCopy.nPts += value;
    }
  };

  const computePts = (scenario: Scenario, eliminatedPlayer: PlayerState, newPlayers: PlayerState[]) => {
    console.log('compute points function')
    
    const playersCopy = newPlayers.map(({ name, role, alive }) => ({ name, role, alive, nPts: 0 }));
    
    console.log('playersCopy :', playersCopy);

    const eliminatedPlayerCopy: PlayerAtPts = playersCopy.find(player => player.name === eliminatedPlayer.name)!;

    console.log('eliminatedPlayerCopy :', eliminatedPlayerCopy);

    scenario.forEach(scenarioKey => {
      const event = events[scenarioKey]!;

      console.log('event :', event)

      event.distrib.forEach(distribution => {
        // Find the players that match the role. If the condition is true, find the alive players, else find all the players
        const matchingPlayers = playersCopy.filter(player => player.role === distribution.to && (distribution.condition ? player.alive : true));

        console.log('matchingPlayers :', matchingPlayers);

        if (scenarioKey === 'through') {
          // eliminated is removed from the matching players
          console.log('scenario is through')
          const index = matchingPlayers.findIndex(player => player.name === eliminatedPlayerCopy.name);
          if (index > -1) {
            matchingPlayers.splice(index, 1);
          }
        };
        
        // Add value to each matching player
        matchingPlayers.forEach(player => addValueToPlayer(player, distribution.value, playersCopy));
      });
    });
  
    return playersCopy;
  };
  
  const pseudosCheck = () => {
    const lengthPlayers = players.filter((player) => player.name !== "").length;
    
    if (lengthPlayers < MIN_PLAYERS) {
      toast(`You need at least ${MIN_PLAYERS} players to play`);
      return false;
    }    

    // Check if there are duplicate names
    const names = players.map((player) => player.name);
    const uniqueNames = new Set(names);

    if (names.length !== uniqueNames.size) {
      toast("You can't have duplicate names");
      return false
    }

    return true
  };

  const settingsCheck = () => {
    const lengthPlayers = players.filter((player) => player.name !== "").length;
    const nC = lengthPlayers - settings.nU.value - settings.nW.value;

    // Check if there are enough undercover and Mr.White
    if (settings.nU.value + settings.nW.value < 1) {
      toast("You need at least one undercover or Mr.White to play");
      return false
    }

    // Check if there are enough players for these settings
    if (settings.nU.value + settings.nW.value >= lengthPlayers) {
      toast("With these settings, you need more players to play");
      return false
    }

    // Check if there are enough civilians
    if (settings.nU.value > nC) {
      toast("There needs to be at least one civilian per undercover");
      return false
    }

    return true
  };

  const handleWhoStarts = () => {
    // check if a player has not seen his word
    const unseenPlayer = players.find((player) => player.seen === false);

    if (unseenPlayer) {
      toast(`${unseenPlayer.name} has not seen his word`);
      return;
    }

    // find a player that is a civil or an undercover
    const startingPlayer = players.find((player) => player.role === "C" || player.role === "U");

    if (startingPlayer) {
      toast(`${startingPlayer.name} starts`);
    } else {
      toast("No one starts");
    }

    setGame((prevState) => {
      return {
        ...prevState,
        elimP: true,
      };
    });  
  };

  const batchRdmRoles = () => {
    const lengthPlayers = players.filter((player) => player.name !== "").length;
    const nC = lengthPlayers - settings.nU.value - settings.nW.value;

    const roles = Array(settings.nU.value).fill("U").concat(Array(settings.nW.value).fill("W")).concat(Array(nC).fill("C"));
    const shuffledRoles = roles.sort(() => Math.random() - 0.5);

    return shuffledRoles
  };

  const checkWKnowsWord = () => {
    if (isModalOpen.wFoundCWord && isModalOpen.wFoundUWord) {
      return 3;
    } else if (isModalOpen.wFoundCWord) {
      return 2;
    } else if (isModalOpen.wFoundUWord) {
      return 1;
    } else {
      return 0;
    }
  };

  const getScenarioUC = (eliminatedPlayer: any): Scenario =>  {
    console.log('getscenario UC function')
    const roleEliminatedPlayer = eliminatedPlayer.role;
    const withoutEliminatedPlayer = players.filter((player) => player.name !== eliminatedPlayer.name);

    const aliveCivilians = withoutEliminatedPlayer.filter((player) => player.role === "C" && player.alive === true);
    const aliveUndercovers = withoutEliminatedPlayer.filter((player) => player.role === "U" && player.alive === true);
    const aliveMrWhite = withoutEliminatedPlayer.filter((player) => player.role === "W" && player.alive === true);

    console.log('roleEliminatedPlayer :', roleEliminatedPlayer);
    console.log('aliveCivilians :', aliveCivilians);
    console.log('aliveUndercovers :', aliveUndercovers);
    console.log('aliveMrWhite :', aliveMrWhite);

    let scenario: Scenario = [];

    if (roleEliminatedPlayer === "U") {
      scenario.push("uElim");
      
      // if no undercover & no white remaining, civilians win
      if (aliveUndercovers.length === 0 && aliveMrWhite.length === 0) {
        scenario.push("cWin");
        return scenario;
      } else {
        scenario.push('through');
      }
      return scenario;
    } else {
      scenario.push("cElim");
      // if one civilian remaining
      if (aliveCivilians.length === 1) {
        if (aliveMrWhite.length === 0) {
          scenario.push("uWin");
          return scenario;
        } else {
          scenario.push("wWinEnd");
          return scenario;
        }
      }
      scenario.push('through');
      return scenario;
    }
  };

  const getScenarioW = (eliminatedPlayer: any): Scenario => {
    console.log('getscenario W function')
    const withoutEliminatedPlayer = players.filter((player) => player.name !== eliminatedPlayer.name);

    const aliveCivilians = withoutEliminatedPlayer.filter((player) => player.role === "C" && player.alive === true);
    const aliveUndercovers = withoutEliminatedPlayer.filter((player) => player.role === "U" && player.alive === true);
    const aliveMrWhite = withoutEliminatedPlayer.filter((player) => player.role === "W" && player.alive === true);

    console.log('aliveCivilians :', aliveCivilians);
    console.log('aliveUndercovers :', aliveUndercovers);
    console.log('aliveMrWhite :', aliveMrWhite);

    let scenario: Scenario = [];

    // if Mr.White is eliminated, open window to with two checkboxes to know wether or not he has found the civilian or the undercover word
    if (checkWKnowsWord() === 3) {
      // white has found all the words
      scenario.push("wKnowsCW");
      scenario.push("wKnowsUW");
      return scenario;

    } else if (checkWKnowsWord() === 2) {
      // white has found the civilian word
      scenario.push("wKnowsCW");
      return scenario;

    } else if (checkWKnowsWord() === 1) {
      // white has found the undercover word
      scenario.push("wKnowsUW");
      return scenario;

    } else {
      scenario.push("wElim");
      scenario.push('through');

      // if no undercover remaining, civilians win
      if (aliveUndercovers.length === 0 && aliveMrWhite.length === 0) {
        scenario.push("cWin");
        return scenario;
      }
      return scenario;
    }
  };

  const handleReset = () => {
    localStorage.removeItem("players");
    localStorage.removeItem("settings");
    localStorage.removeItem("game");

    setGame(initGame);
    setPlayers([]);
    setSettings(initSettings);
    setPlayerInput("");

    toast("Game reset");
  };

  const handlePtsReset = () => {
    setPlayers(players.map(player => {
      return {
        ...player,
        points: 0,
      };
    }));

    toast("Points reset");
  };

  const openCloseModal = (wPElim: string = "") => {
    setIsModalOpen((prevState) => {
      if (wPElim.length === 0) {
        return {
          ...prevState,
          open: !prevState.open,
        };
      } else {
        console.log('length is not 0')
        return {
          ...prevState,
          open: !prevState.open,
          wPElim: wPElim,
        };
      }
    });  
  };

  const handleCheckboxChange = (key: any) => (event: any) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [key]: event.target.checked,
    }));
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-4 sm:p-18 gap-y-8">
      <div className="items-center mx-4 sm:mx-2 mb-3">
        <h1 className="text-2xl font-semibold">
          The Undercover
        </h1>
      </div>
      <div id='setup' className={ isPlaying ? 'fade-out' : 'fade'}> 
        <div className="place-items-center mx-4 sm:mx-2">
          <div className="flex flex-col place-items-center mx-4 sm:mx-2 gap-y-2">
            <h3 className={`my-3 text-lg opacity-50`}>
              Whos playing ?
            </h3>
            <div className={horizontalSizeClasses}>
              <label htmlFor='add-player' className="invisible">
                i
              </label>
              <input
                value={playerInput}
                onChange={handlePlayerInput}
                placeholder="Enter player's name"
                className={inputClasses}
                type="text"
                id='add-player'
              />
              <button onClick={handleAddPlayer} className="border-2 border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 font-bold py-2 px-2 rounded"
                type="button">
                +
              </button>
            </div>
            <ul role="list" className="divide-y divide-gray-300">
              {players.map((player, index) => (
                <li key={index} className="py-2">
                  <div className={horizontalSizeClasses}>
                    <label htmlFor={`player-${index}`} className="invisible">
                      i
                    </label>
                    <input
                      value={player.name}
                      onChange={(e) => handleEditPlayer(index, e.target.value)}
                      className={inputClasses}
                      type="text"
                      id={`player-${index}`}
                    />
                    <button onClick={() => handleRemovePlayer(player.name)}
                      className="border-2 border-red-500 text-red-500 hover:border-red-700 hover:text-red-700 font-xs font-bold py-2 px-2 rounded"
                      type="button">
                      x
                    </button>  
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col place-items-center mx-4 sm:mx-2 gap-y-2">
            <div className="flex flex-col place-items-center mx-4 sm:mx-2 gap-y-2">
              <h3 className={`my-3 text-lg opacity-50`}>
                Role settings
              </h3>
              {Object.entries(settings).map(([field, setting]) => (
                <div key={field} className={horizontalSizeClasses}>
                  <label htmlFor={field}>
                    {setting.description}
                  </label>
                  {typeof setting.value === 'boolean' ? 
                      <input 
                          id={field}
                          type="checkbox" 
                          checked={setting.value} 
                          onChange={(event) => handleSettingsChange(event, field as keyof Settings)}
                          className={inputClasses}
                      />
                      :
                      <input
                          id={field}
                          type="number" 
                          value={setting.value} 
                          onChange={(event) => handleSettingsChange(event, field as keyof Settings)}
                          className={inputClasses}
                          min={0}
                      />
                    }
                </div>
              ))}
            </div>
            <div className={isPtsSettings ? 'fade flex flex-col place-items-center mx-4 sm:mx-2 gap-y-4' : 'fade-out'}>
              <h3 className={`my-3 text-lg opacity-50`}>  
                Points settings
              </h3>
              {Object.entries(events).map(([key, event]) => (
                <div key={key} className={horizontalEventSizeClasses}>
                  <h6>{event.description}</h6>
                  {event.distrib.map((dist, index) => {
                    const id = `${key}-${index}`; // Create a unique id for each input
                    return (
                      <div key={index} className={horizontalSizeClasses}>
                        <label htmlFor={id}>To: {roleNames[dist.to]}, with condition: {dist.conditionString}</label>
                        <input
                          id={id}
                          type="number" 
                          value={dist.value}
                          onChange={(event) => handleEventsChange(event, key as keyof Events, index)}
                          className={inputClasses}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id='game' className={isPlaying ? 'fade' : 'fade-out'}>
        <div className="flex flex-col place-items-center mx-4 sm:mx-2">
          <h3 className={`my-3 text-lg opacity-50`}>
            Game #{game.gameN} |
            Round #{game.roundN}
          </h3>
          <ul role="list" className="divide-y divide-gray-300">            
            {players.map((player, index) => (
              <li key={index} className="py-2">
                <div className="flex justify-between items-center mx-4 sm:mx-2 gap-x-2">
                  {
                    !game.elimP ?
                      <span className="text-lg font-semibold">
                        {player.points}
                      </span> 
                    : ''
                  }
                  <span className="text-lg font-semibold">
                    {player.name}
                  </span>
                  <button onClick={() => handleShowWord(player)} className={ game.elimP ? 'fade-out' : "fade text-xs border-2 border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 font-bold py-1 px-1 rounded"}
                    type="button">
                    {player.seen ? 'show again' : 'show word'}
                  </button>
                  <button onClick={() => handleElimination(player)} className={ game.elimP && player.alive ? "fade text-xs border-2 border-red-500 text-red-500 hover:border-red-700 hover:text-red-700 font-bold py-1 px-1 rounded" : 'fade-out'}
                    type="button">
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center mx-4 sm:mx-2 gap-y-2">
        <div className={ isPlaying ? "fade" : "fade-out"}>
          <button onClick={handleWhoStarts} className={ game.elimP ? "fade-out" : "fade border-2 border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 font-bold my-2 py-2 px-2 rounded"}
            type="button">
            {game.elimP ? '' : 'Who shall start ?'}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-x-2">
          <button onClick={handlePlay} className="border-2 border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 font-bold my-2 py-2 px-2 rounded"
            type="button">
            {isPlaying ? 'Setup' : 'Play'}
          </button>
          <button onClick={handleAttribution} className={ isPlaying ? "fade border-2 border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 font-bold my-2 py-2 px-2 rounded" : 'fade-out'}
            type="button">
            {isPlaying ? 'Shuffle' : ''}
          </button>
          <button onClick={handlePtsSettings} className={ isPlaying ? 'fade-out' : "fade border-2 border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 font-bold my-2 py-2 px-2 rounded"}
            type="button">
            {isPtsSettings ? 'Close points settings' : 'Points settings'}
          </button>
          <button onClick={handleReset} className={ isPlaying ? 'fade-out' : 'fade border-2 border-red-500 text-red-500 hover:border-red-700 hover:text-red-700 font-bold my-2 py-2 px-2 rounded'}
            type="button">
            Reset
          </button>
          <button onClick={handlePtsReset} className={ isPlaying ? 'fade-out' : 'fade border-2 border-red-500 text-red-500 hover:border-red-700 hover:text-red-700 font-bold my-2 py-2 px-2 rounded'}
            type="button">
            Points Reset
          </button>
        </div>  
      </div>
      <Modal
        isOpen={isModalOpen.open}
        onRequestClose={() => openCloseModal()}
        contentLabel="Mr.White Word Check"
        ariaHideApp={false}
        className="ReactModal flex flex-col items-center justify-between m-8 rounded p-4 px-2 sm:p-18 gap-y-4 border-2 border-indigo-400 bg-indigo-200 bg-opacity-60"
        shouldCloseOnOverlayClick={true}
      >
        <h2>A Mr.White has been eliminated</h2>
        <p>Did Mr.White find the civil and/or the undercover word?</p>
        <div >
          <label htmlFor="wFoundCWord">
            Civil Word
            <input 
              id="wFoundCWord"
              type="checkbox" 
              checked={isModalOpen.wFoundCWord} 
              onChange={handleCheckboxChange("wFoundCWord")}
              className={inputClasses}
            />
          </label>
        </div>
        <div >
          <label htmlFor="wFoundUWord">
            Undercover Word
            <input 
              id="wFoundUWord"
              type="checkbox" 
              checked={isModalOpen.wFoundUWord} 
              onChange={handleCheckboxChange("wFoundUWord")}
              className={inputClasses}
            />
          </label>
        </div>
        <button onClick={() => handleWElim()}
          type="button"
          className="text-xs border-2 border-red-400 text-red-300 hover:border-red-400 hover:text-red-400 font-bold py-1 px-1 rounded">
          x
        </button>
      </Modal>
      <ToastContainer />
    </main>
  );
};