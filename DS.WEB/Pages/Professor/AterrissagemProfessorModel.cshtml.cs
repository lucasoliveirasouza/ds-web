using DS.WEB.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace DS.WEB.Pages.Professor
{
    public class AterrissagemProfessorModel : PageModel
    {
        public List<ProfessorModel> Professores { get; }


        public void OnGet()
        {
        }
    }
}
