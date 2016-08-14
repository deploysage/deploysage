module Suite exposing (main)

import Test exposing (concat)
import Test.Runner.Log
import Html.App
import Html

import DeploySageElm.Utils.ReverserTest exposing (reverser)

main : Program Never
main =
    Html.App.beginnerProgram
        { model = ()
        , update = \_ _ -> ()
        , view = \() -> Html.text "Check the console for useful output!"
        }
        |> Test.Runner.Log.run (Test.concat
          [
            reverser
          ]
          )
