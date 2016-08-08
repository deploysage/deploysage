module DeploySageElm.Types exposing (..)

type Msg
  = Publish String
  | Receive String


type alias Model =
    { url : String
    }

--{
--        result: {
--          orgs: %w(1 2),
--        },
--        entities: {
--          orgs: {
--            '1' => { id: '1', name: org.name },
--            '2' => { id: '2', name: org2.name },
--          },
--        },
