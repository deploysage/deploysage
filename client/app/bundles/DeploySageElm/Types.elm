module DeploySageElm.Types exposing (..)

type Msg
  = Publish String
  | Receive String


type alias Model =
    { state : String
    }
