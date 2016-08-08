port module DeploySageElm.Ports exposing (..)

import DeploySageElm.Types exposing (..)

port updateFromClient : String -> Cmd msg

port receiveChangeOperationsDocument : (String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
  receiveChangeOperationsDocument Receive

