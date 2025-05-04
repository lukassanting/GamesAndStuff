using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;




[ApiController] // Marks the following class as an API controller, which allows for API-specific behaviours
[Route("[controller]")]
public class GameController : ControllerBase{
    // Using depedency injection instead of direct instantiation
    private readonly TicTacToeService _service;
    public GameController(TicTacToeService service){
        _service = service;
    }

    [HttpGet]
    public ActionResult<GameState> GetNewGame(){

        return Ok(new GameState());
    }

    [HttpPost("move")]
    public ActionResult<GameState> MakeMove([FromBody] GameState state, [FromQuery] int position){
        var updatedState = _service.MakeMove(state, position);
        return Ok(updatedState);
    }
}
