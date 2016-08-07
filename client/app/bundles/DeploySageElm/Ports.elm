port module DeploySageElm.Ports exposing (..)

import DeploySageElm.Types exposing (..)

port publishUpdate : String -> Cmd msg

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Publish newState ->
      (model, publishUpdate newState)
    Receive newState ->
      ({ model | state = newState }, Cmd.none)

port receiveChangeOperationsDocument : (String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
  receiveChangeOperationsDocument Receive

