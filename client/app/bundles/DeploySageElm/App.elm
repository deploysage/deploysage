module DeploySageElm.App exposing (main)

import DeploySageElm.Ports as Ports
import DeploySageElm.State as State
import DeploySageElm.View as View
import Html.App

main : Program Never
main =
    Html.App.program
        { init =
            ( State.initialModel
            , State.initialCommands
            )
        , view = View.root
        , update = State.update
        , subscriptions = Ports.subscriptions
        }
