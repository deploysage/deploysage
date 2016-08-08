module DeploySageElm.State exposing (..)

import DeploySageElm.Ports exposing (..)
import DeploySageElm.Types exposing (..)


initialModel : Model
initialModel =
    { url = ""
    }

initialCommands : Cmd Msg
initialCommands =
    Cmd.batch
        [ Cmd.none
        ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Publish newState ->
      (model, updateFromClient newState)
    Receive newState ->
      ({ model | state = newState }, Cmd.none)
