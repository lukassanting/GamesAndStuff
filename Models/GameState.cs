public class GameState{
    public string[] Board {get; set;} = new string[9];
    public string CurrentPlayer {get; set;} = "X";
    public string? Winner {get; set;}
}