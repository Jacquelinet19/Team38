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

@WebServlet("/info-mentor")
public class InfoMentorServlet extends HttpServlet {
    
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        
        Query<Entity> query = Query.newEntityQueryBuilder().setKind("Mentor").
        setOrderBy(OrderBy.desc("mentorName")).build();
    
        QueryResults<Entity> results = datastore.run(query);

        List<Mentor> mentorsList = new ArrayList<>();
        while (results.hasNext()) {
            Entity entity = results.next();

            String username = entity.getKey().getName();
            String name = entity.getString("mentorName");
            String email = entity.getString("mentorEmail");
            String role = entity.getString("mentorJob");
            String college = entity.getString("mentorCollege");
            String intro = entity.getString("mentorIntro");
            String expert = entity.getString("mentorExpertise");

            Mentor myMentor = new Mentor(name, email, username, role, college, intro, expert);
            mentorsList.add(myMentor);
        }

        Gson gson = new Gson();

        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(mentorsList));
    }
}