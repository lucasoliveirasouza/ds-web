using DS.WEB.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace DS.WEB.Pages.Disciplina;

public class AdicionarAlunoDisciplinaModel : PageModel
{
    public List<AlunoModel> AlunosDisciplina { get; }

    public AlunoModel Aluno { get; }

    public IActionResult OnGet(string id, string nome)
    {
        if(!string.IsNullOrEmpty(id) && !string.IsNullOrEmpty(nome))
        {
            ViewData["idDisciplina"] = id;
            ViewData["nomeDisciplina"] = nome;
        }

        return Page();
    }
}
