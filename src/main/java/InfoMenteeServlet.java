import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;

@WebServlet("/info-mentee")
public class InfoMenteeServlet extends HttpServlet {
    
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        
        Query<Entity> query = Query.newEntityQueryBuilder().setKind("Mentee").
            setOrderBy(OrderBy.desc("menteeName")).build();
    
        QueryResults<Entity> results = datastore.run(query);

        List<Mentee> menteesList = new ArrayList<>();
        while (results.hasNext()) {
            Entity entity = results.next();

            String username = entity.getKey().getName();
            String name = entity.getString("menteeName");
            String email = entity.getString("menteeEmail");
            String school = entity.getString("menteeSchool");
            String year = entity.getString("menteeClassStanding");
            String intro = entity.getString("menteeIntro");
            String reason = entity.getString("menteeReason");
            String skills = entity.getString("menteeDesiredSkills");
            
            Mentee myMentee = new Mentee(name, email, username, school, year, intro, reason, skills);
            menteesList.add(myMentee);
        }

        Gson gson = new Gson();

        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(menteesList));
    }
}