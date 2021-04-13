import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@WebServlet("/log-in")
public class LogInServlet extends HttpServlet {

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.

        String inp_username = Jsoup.clean(request.getParameter("username"), Whitelist.none());
        String direction = "#";
        String type = "";
                
        //Look up if it's a mentor
        Query<Entity> queryMentor = Query.newEntityQueryBuilder().setKind("Mentor")
            .setFilter(PropertyFilter.eq("mentorUsername", inp_username)).build();
        QueryResults<Entity> resultsMentor = datastore.run(queryMentor);        
        
        //Look up if it's a mentee
        Query<Entity> queryMentee = Query.newEntityQueryBuilder().setKind("Mentee")
            .setFilter(PropertyFilter.eq("menteeUsername", inp_username)).build();
        QueryResults<Entity> resultsMentee = datastore.run(queryMentee);

        if(resultsMentor != null){
            while(resultsMentor.hasNext()){
                Entity entity = resultsMentor.next();
                entity.getString("mentorUsername");
                direction = inp_username;
                type = "mentor";
            }
        }
        if (resultsMentee != null){
            while(resultsMentee.hasNext()){
                Entity entity = resultsMentee.next();
                entity.getString("menteeUsername");
                direction = inp_username;
                type = "mentee";
            }
        }
        
        response.sendRedirect("/matchingPage.html?username="+direction+"&type="+type);
    }
}