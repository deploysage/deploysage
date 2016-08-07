module Suite exposing (suite)

import Test exposing (concat)
import Test.Runner.Log
import Html.App
import Html

import Utils.ReverserTest exposing (..)

suite : Program Never
suite =
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
