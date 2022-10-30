import React, { useEffect } from 'react';

async function render() {
  let dataBack = {}
  let dataStage = await fetch('http://localhost:8081/stage').then(res => res.json());
  let dataMatch = await fetch('http://localhost:8081/match').then(res => res.json());
  let dataParticipant = await fetch('http://localhost:8081/participant').then(res => res.json());
  let dataGroup = await fetch('http://localhost:8081/group').then(res => res.json());
  let dataRound = await fetch('http://localhost:8081/round').then(res => res.json());
  let dataMatchGame = await fetch('http://localhost:8081/match_game').then(res => res.json());
  dataBack = {
    "participant": dataParticipant,
    "match": dataMatch,
    "stage": dataStage,
    "group": dataGroup,
    "round": dataRound,
    "match_game": dataMatchGame
  }

  window.bracketsViewer.render({
      stages: dataBack.stage,
      matches: dataBack.match,
      // matchGames: data.match_game,
      participants: dataBack.participant,
  }, {
      selector: '#idviewer',
      participantOriginPlacement: 'before',
      separatedChildCountLabel: true,
      showSlotsOrigin: true,
      showLowerBracketSlotsOrigin: true,
      highlightParticipantOnHover: true,
  }).then(
      () => console.log('Render finished')
  );

  window.bracketsViewer.onMatchClicked = async (matchObjeto) => {
    
    // Obtiene nombre equipo seleccionado en base al estilo hover de la clase participant
    const equipoSeleccionadoHTML = document.querySelector(`[data-match-id="${matchObjeto.id}"] .opponents .participant:hover .name`).textContent;
    // Obtiene objeto de tipo Participant filtrado por nombre de equipo seleccionado
    let equipoObjeto = await fetch('http://localhost:8081/participant?name=' + equipoSeleccionadoHTML).then(res => res.json());
    // En base al match captado en el evento onMatchClicked
    // determinar a que oponente se hizo la seleccion para colocar estado de win y loss
    if(equipoObjeto[0].id === matchObjeto.opponent1.id){
      matchObjeto.opponent1.result = 'win'
      matchObjeto.opponent2.result = 'loss'
    }
    if(equipoObjeto[0].id === matchObjeto.opponent2.id){
      matchObjeto.opponent2.result = 'win'
      matchObjeto.opponent1.result = 'loss'
    }
    // Proceso de actualización de los datoa a nivel de brackets
    const dataL = dataBack;
    await window.bracketsManager.import(dataL);
    await window.bracketsManager.update.match(
      {
        id: matchObjeto.id,
        opponent1: matchObjeto.opponent1,
        opponent2: matchObjeto.opponent2,
      }
    );
    const resultDataTorneo = await window.bracketsManager.export();
    console.log("resultDataTorneo");
    console.log(resultDataTorneo);
    // Actualizamos base de datos de match
    for (const singleMatch of resultDataTorneo.match) {
      await fetch('http://localhost:8081/match/'+ singleMatch.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(singleMatch)
      }).then(res => res.json());
        
    }
    
    render();
  }

}

function App() {
  useEffect(() => {
    render();
  }, []);
  
  return <div id="idviewer"  className="brackets-viewer"></div>
}

export default App;